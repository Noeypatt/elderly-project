import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).send({ message: 'Only GET requests allowed' })
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
                    /\\n/g,
                    '\n'
                ),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        })

        const sheets = google.sheets({
            auth,
            version: 'v4',
        })

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: `ข้อมูลเกี่ยวกับภาครัฐ!A9:O`,
        })

        if (response.data.values) {
            const rows: any[] = response.data.values
            if (rows.length) {
                return res.status(201).json({
                    data: rows.map((row) => ({
                        activities: {
                            society: row[3],
                            society_note: row[4],
                            religious: row[5],
                            religious_note: row[6],
                        },
                        municipality: {
                            receiving: row[7],
                            receiving_note: row[8],
                            channel: row[9],
                            channel_note: row[10],
                        },
                        distress: {
                            detail: row[11],
                            note: row[12],
                        },
                        help: {
                            detail: row[13],
                            note: row[14],
                        },
                    })),
                    range: response.data.range,
                    total: rows.length,
                })
            }
        }
    } catch (e: any) {
        return res
            .status((e as any).code)
            .send({ error: { message: (e as Error).message } })
    }
}
