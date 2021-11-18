<script lang="ts">
    import { AppService } from "../services/App.service";

    type FormValues = {
        album: string;
        images: FileList;
    };

    let form: FormValues = {
        album: "",
        images: null,
    };
    let errors: any = {};

    const onSubmit = async () => {
        const appService = new AppService();

        for (const image of form.images) {
            const data = await appService.postAlbum({
                name: image.name,
                album: form.album,
            });
            appService.postAlbumImage(data["id"], image);
        }
    };
</script>

<div class="container">
    <div class="box">
        <h1>Admin</h1>
        <form on:submit|preventDefault={onSubmit}>
            <h2>Add images to album</h2>
            <div class="row">
                <div>
                    <label for="album">Album</label>
                    <input
                        type="text"
                        id="album"
                        bind:value={form.album}
                        required
                    />
                    {#if errors.album}
                        <p>Required</p>
                    {/if}
                </div>
                <div>
                    <label for="images">Images</label>
                    <input
                        type="file"
                        id="images"
                        accept="image/png, image/jpeg"
                        multiple={true}
                        bind:files={form.images}
                        required
                    />
                    {#if errors.images}
                        <p>Required</p>
                    {/if}
                </div>
            </div>
            <button type="submit">Send</button>
        </form>
    </div>
</div>

<style>
    .container {
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
    }

    .box {
        padding: 15%;
        width: 100%;
    }

    h1,
    h2 {
        margin: 20px 0;
    }

    form {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form > div.row {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        align-self: flex-end;
        width: 100%;
        background-color: #4c66af;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #457ba0;
    }
</style>
