import * as fs from "@tauri-apps/api/fs";
import { getClient, ResponseType } from "@tauri-apps/api/http";

const AudioPlayer = () => {
    // const client = await getClient();
    // const data = (
    // await client.get(url, {
    //     responseType: ResponseType.Binary,
    // })
    // ).data as any;
    // await fs.writeBinaryFile(
    //     destFilePath, // Change this to where the file should be saved
    //     data
    // );

    return <div>
        <h3>This is Auido Player via Rust</h3>
    </div>
}

export default AudioPlayer