/**
 * Webhook Simulation Script for OpenPro Automation
 * Run this to test your local webhook endpoint without needing GitHub.
 * 
 * Usage: node scripts/simulate-webhook.js
 */

const SIMULATE_URL = 'http://localhost:3000/api/webhook';

// CHANGE THIS: Use a real Work Package ID from your OpenProject (e.g., 12)
const TEST_ID = '37';

const mockPayloads = [
    {
        name: 'Single GitHub Push',
        data: {
            repository: { full_name: 'facebook/react' },
            commits: [
                {
                    id: 'a1b2c3d',
                    message: `Fixed state bug in #${TEST_ID} and refactored logic`,
                    author: { name: 'Dan Abramov' },
                    timestamp: new Date().toISOString(),
                    url: 'https://github.com/facebook/react/commit/a1b2c3d'
                }
            ]
        }
    },
    {
        name: 'GitLab Multi-Push',
        data: {
            object_kind: 'push',
            project: { path_with_namespace: 'org/core-api' },
            commits: [
                {
                    id: 'f9e8d7c',
                    message: 'Initial draft for #42 project setup',
                    author: { name: 'Alice Smith' },
                    timestamp: new Date().toISOString(),
                    url: 'https://gitlab.com/org/core-api/-/commit/f9e8d7c'
                }
            ]
        }
    }
];

async function simulate() {
    console.log('🚀 Starting Webhook Simulation...\n');

    for (const payload of mockPayloads) {
        console.log(`📡 Sending [${payload.name}] to ${SIMULATE_URL}...`);

        try {
            const response = await fetch(SIMULATE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload.data)
            });

            const result = await response.json();
            console.log('✅ Response:', JSON.stringify(result, null, 2));
        } catch (error) {
            console.error('❌ Failed:', error.message);
        }
        console.log('\n---\n');
    }
}

simulate();
