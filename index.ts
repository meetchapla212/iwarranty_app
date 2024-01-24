import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { program } from 'commander';
import { argv } from "process";

type Retailer = {
    directory_category: string;
    content_children_count: Object;
    directory_contact__email: string;
    directory_contact__fax: number;
    directory_contact__mobile: number;
    directory_contact__phone: number;
    directory_contact__website: string;
    content_post_id: number;
    content_post_slug: string;
    content_body: string;
    directory_location__street: string;
    directory_location__city: string;
    directory_location__country: string;
    directory_location__address: string;
    directory_location__lat: number;
    directory_location__lng: number;
    directory_location__zip: number;
    directory_location__state: string;
    directory_social__facebook: string;
    directory_social__googleplus: string;
    directory_social__twitter: string;
    content_post_status: string;
    content_post_title: string;
};

(() => {
    const csvFilePath = path.resolve(__dirname, 'files/iw-tech-test-retailer-data.xlsx - directory_listing-20230530.csv');

    const headers = ['directory_category', 'content_children_count', 'directory_contact__email', 'directory_contact__fax', 'directory_contact__mobile', 'directory_contact__phone', 'directory_contact__website', 'content_post_id', 'content_post_slug', 'content_body', 'directory_location__street', 'directory_location__city', 'directory_location__country', 'directory_location__address', 'directory_location__lat', 'directory_location__lng', 'directory_location__zip', 'directory_location__state', 'directory_social__facebook', 'directory_social__googleplus', 'directory_social__twitter', 'content_post_status', 'content_post_title'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    program
        .command("search")
        .description('Retailer Lists')
        .action(() => {
            let title = ''
            if (process.argv.length > 3) {
                for (let i = 3; i < process.argv.length; i++) {
                    if (i == 3) {
                        title = title + process.argv[i].toUpperCase()
                    }
                    else {
                        title = title + " " + process.argv[i].toUpperCase()
                    }
                }
            }
            parse(fileContent, {
                delimiter: ',',
                columns: headers,
                on_record: (line, context) => {
                    if (line.content_post_title.includes(title)) {
                        return line;
                    } else {
                        return;
                    }
                }
            }, (error, result: Retailer[]) => {
                if (error) {
                    console.error(error);
                }

                console.log("Result", result);
            })
        })

    program.parse(process.argv);

})();