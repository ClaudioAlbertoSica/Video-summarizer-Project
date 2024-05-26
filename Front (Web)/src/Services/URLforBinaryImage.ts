export const URLforBinaryImage = (binaryString: string) => {
    return urlforBlob(binarytoBlob(binaryString));
}

const binarytoBlob = (binaryString: string) => {
    const byteArray = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
    return new Blob([byteArray], { type: "image/jpg" });
  };

  const urlforBlob = (data: Blob) => {
    const url = URL.createObjectURL(data);
    return url;
  };

