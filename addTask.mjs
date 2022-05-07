import { createGzip, createUnzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { resolve } from "path";


const number = 0;

if(number == 1){
    const inp = createReadStream('input.txt');
    const out = createWriteStream('input.txt.gz');
    const czip = createGzip();
    inp.pipe(czip).pipe(out)
    console.log("Zipping!");

} else {

    const inp2 = createReadStream('input.txt.gz');
    const out2 = createWriteStream('input2.txt');
    const unzip = createUnzip();
    inp2.pipe(unzip).pipe(out2);
    console.log("Unzipping!");
}
