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
            range: `ข้อมูลด้านสุขภาพ!A9:V`,
        })

        if (response.data.values) {
            const rows: any[] = response.data.values
            if (rows.length) {
                return res.status(201).json({
                    data: rows.map((row) => ({
                        detail: row[3],
                        disability: row[4],
                        disability_note: row[5],
                        cause_of_disability: row[6],
                        cause_of_disability_note: row[7],
                        congenital_disease: row[8],
                        congenital_disease_note: row[9],
                        treatment: row[10],
                        treatment_note: row[11],
                        hospital: row[12],
                        hospital_note: row[13],
                        health_check: row[14],
                        health_check_note: row[15],
                        exercise: row[16],
                        exercise_note: row[17],
                        binge: row[18],
                        binge_note: row[19],
                        smoking:row[20],
                        smoking_note:row[21]

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
