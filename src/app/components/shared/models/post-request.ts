export class PostRequest{
    contentType: string;
    content: string;
    privacy: string;

    constructor(contentType: string, content: string, privacy: string){
        this.contentType = contentType;
        this.content = content;
        this.privacy = privacy;
    }
}