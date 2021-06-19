export class Post{
    id: String
    author: String
    date: Date
    content: String
    likes: BigInt
    dislikes: BigInt
    comments: Array<Comment>

    constructor(
        id: String,
        author: String,
        date: Date,
        content: String,
        likes: BigInt,
        dislikes: BigInt,
        comments: Array<Comment>
    ) {
        this.id = id
        this.author = author
        this.date = date
        this.content = content
        this.likes = likes
        this.dislikes = dislikes
        this.comments = comments
    }
}