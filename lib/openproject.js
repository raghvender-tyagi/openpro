/**
 * OpenProject API Client Service
 */

const OPENPROJECT_URL = process.env.NEXT_PUBLIC_OPENPROJECT_URL || process.env.OPENPROJECT_URL;
const API_KEY = process.env.OPENPROJECT_API_KEY;

export async function updateWorkPackage(wpId, message, commitUrl) {
    if (!OPENPROJECT_URL || !API_KEY) {
        console.error('Missing OpenProject configuration in environment variables.');
        return { success: false, error: 'Configuration Missing' };
    }

    const endpoint = `${OPENPROJECT_URL.replace(/\/$/, '')}/api/v3/work_packages/${wpId}/activities`;

    const auth = Buffer.from(`apikey:${API_KEY}`).toString('base64');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: {
                    raw: `🤖 **Automatic Sync**:\n\n${message}\n\n[View Commit](${commitUrl})`
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Failed to update WP #${wpId}`);
        }

        return { success: true, wpId };
    } catch (error) {
        console.error(`Error updating OpenProject WP #${wpId}:`, error.message);
        return { success: false, wpId, error: error.message };
    }
}
