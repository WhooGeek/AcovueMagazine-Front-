import { postImageUpload } from '../../api/Post.api';

export default class S3UploadAdapter {
    constructor(loader, setImageUrls) {
        this.loader = loader;
        this.setImageUrls = setImageUrls;
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    postImageUpload(formData)
                        .then((res) => {                            
                            const url = res.data.data.imageUrl;       
                            if(typeof this.setImageUrls === 'function'){
                                this.setImageUrls((prev) => [...prev, url]);
                            }
                            resolve({ default: url });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
        );
    }
}