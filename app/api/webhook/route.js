import { NextResponse } from 'next/server';
import { parseGitPayload } from '@/lib/parser';
import { updateWorkPackage } from '@/lib/openproject';
import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'data', 'logs.json');

function getLogs() {
    try {
        if (!fs.existsSync(LOG_FILE)) return [];
        const data = fs.readFileSync(LOG_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveLogs(logs) {
    try {
        const dir = path.dirname(LOG_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (e) {
        console.error('Failed to save logs:', e);
    }
}

export async function POST(request) {
    try {
        const payload = await request.json();
        const commits = parseGitPayload(payload);

        if (commits.length === 0) {
            return NextResponse.json({ message: 'No commits found in payload' });
        }

        const results = [];

        for (const commit of commits) {
            if (commit.workPackageIds.length === 0) {
                results.push({
                    id: commit.id,
                    status: 'skipped',
                    message: 'No Work Package IDs found'
                });
                continue;
            }

            for (const wpId of commit.workPackageIds) {
                const updateResult = await updateWorkPackage(
                    wpId,
                    commit.message,
                    commit.url
                );

                results.push({
                    id: commit.id,
                    wpId,
                    status: updateResult.success ? 'success' : 'error',
                    error: updateResult.error
                });
            }
        }

        // Add to persistent logs
        const logEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            provider: payload.repository ? 'GitHub' : 'GitLab',
            repo: (payload.repository?.full_name || payload.project?.path_with_namespace) || 'Unknown',
            commitsCount: commits.length,
            results
        };

        const currentLogs = getLogs();
        const updatedLogs = [logEntry, ...currentLogs].slice(0, 50);
        saveLogs(updatedLogs);

        return NextResponse.json({
            message: 'Automations processed',
            summary: results
        });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json(getLogs());
}
