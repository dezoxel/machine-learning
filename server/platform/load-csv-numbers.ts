import * as fs from 'fs';
import * as path from 'path';

export const load_csv_numbers = (file_path: string): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
        const training_set_absolute_path = path.join(__dirname, '..', file_path);
        fs.readFile(training_set_absolute_path, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const lines = data.trim().split('\n').slice(1);

            const table = lines.map(line => line.split(',').map(Number));

            resolve(table);
        });
    });
}
