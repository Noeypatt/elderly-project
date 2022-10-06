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
            range: `ข้อมูลด้านครอบครัวเเละที่อยู่อาศัย!A9:N`,
        })

        if (response.data.values) {
            const rows: any[] = response.data.values
            if (rows.length) {
                return res.status(201).json({
                    data: rows.map((row) => ({
                        residence: {
                            land: row[3],
                            residential: row[4],
                            residential_conditions: row[6],
                            house_conditions: row[13],
                            note: row[5],
                        },
                        family: {
                            elderly: row[7],
                            working_age: row[8],
                            children: row[9],
                            occupation_income: row[10],
                            no_occupation_income: row[11],
                            total: row[12],
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
