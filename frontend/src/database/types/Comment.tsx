export class Comment {
    id: String
    author: String
    date: Date
    content: String
    likes: BigInt
    dislikes: BigInt

    constructor(
        id: String,
        author: String,
        date: Date,
        content: String,
        likes: BigInt,
        dislikes: BigInt
    ) {
        this.id = id
        this.author = author
        this.date = date
        this.content = content
        this.likes = likes
        this.dislikes = dislikes
    }
}