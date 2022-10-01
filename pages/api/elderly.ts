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
        const sheetName = req.query.type || 'ข้อมูลทั่วไป'
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
            range: `${sheetName}!A9:AJ`,
        })

        if (response.data.values) {
            const rows: any[] = response.data.values
            if (rows.length) {
                return res.status(201).json({
                    data: rows.map((row) => ({
                        sex: row[2],
                        age: row[7],
                        status: row[12],
                        receiving_welfare: row[22],
                        watcher: row[23],
                        study: row[29],
                        occupation: row[30],
                        income_per_month: row[32],
                        source_income: row[33],
                        expenses: row[34],
                        saving: row[35],
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
