/**
 * Parser utility for Git webhook payloads (GitHub & GitLab)
 */

export function parseGitPayload(payload) {
    const commits = [];

    // GitHub Format
    if (payload.commits && Array.isArray(payload.commits)) {
        payload.commits.forEach(commit => {
            commits.push({
                id: commit.id,
                message: commit.message,
                author: commit.author.name || commit.author.username,
                timestamp: commit.timestamp,
                url: commit.url
            });
        });
    }
    // GitLab Format
    else if (payload.object_kind === 'push' && payload.commits) {
        payload.commits.forEach(commit => {
            commits.push({
                id: commit.id,
                message: commit.message,
                author: commit.author.name,
                timestamp: commit.timestamp,
                url: commit.url
            });
        });
    }

    return commits.map(commit => ({
        ...commit,
        workPackageIds: extractWorkPackageIds(commit.message)
    }));
}

function extractWorkPackageIds(message) {
    // Matches #123, #456, etc.
    const regex = /#(\d+)/g;
    const ids = [];
    let match;
    while ((match = regex.exec(message)) !== null) {
        ids.push(match[1]);
    }
    return [...new Set(ids)]; // Unique IDs
}
