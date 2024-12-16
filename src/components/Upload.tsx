
export const imageUpload= async (image: File) => {
    // console.log(image);
    // const name = makeid(32);
    const res = await fetch("https://api.oneblock.vn/be/s3/?bucket=cms-images&name=" +image.name , {
        method: "PUT",
        body: image,
    })
    const data = await res.json()
    return data.url
}

export const imagePreview= (imageSource: string) => {
    // console.log(imageSource);
    if (imageSource.startsWith("https")) {
        return Promise.resolve(imageSource);
    }
    return Promise.resolve('https://api.oneblock.vn/be/s3/?bucket=cms-images&name='+imageSource);
}

const  makeid = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
