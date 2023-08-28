import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { v4 as uuidv4 } from 'uuid'

import { Avatar } from './Avatar'
import { Comment, CommentType } from './Comment'
import styles from './Post.module.css'
import { LinkComponent } from './LinkComponent';
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react';

interface Author {
   name: string;
   role: string;
   avatarUrl: string;
}

interface Content {
   type: 'paragraph' | 'link';
   content: string;
}

export interface PostType {
   id: number;
   author: Author;
   publishedAt: Date;
   content: Content[];
}

interface PostProps {
   post: PostType;
}

export function Post({ post }: PostProps) {

   const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
   })

   const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
      locale: ptBR,
      addSuffix: true,
   })

   const [comments, setComments] = useState([
      {
         id: '1cy25d4-59a1-452f-839e-129df0b6c28d',
         content: 'Post muito banaca hein?'
      }
   ])

   const [newCommentText, setNewCommentText] = useState('')

   function handleCreateNewComment(event: FormEvent) {
      event.preventDefault()
      const uniqueId = uuidv4()

      setComments([...comments, {
         id: uniqueId,
         content: newCommentText
      }])
      setNewCommentText('')
   }

   function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('')
      setNewCommentText(event.target.value)
   }

   function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('Esse campo é obrigatório')
   }

   function deleteComment(commentToDelete: CommentType) {
      const commentWithoutDeletedOne = comments.filter(comment => {
         return comment.id !== commentToDelete.id
      })
      setComments(commentWithoutDeletedOne)
   }

   const isNewCommentEmpty = newCommentText.length === 0

   return (
      <>
         <article className={styles.post}>
            <header>
               <div className={styles.author}>
                  <Avatar src={post.author.avatarUrl} />
                  <div className={styles.authorInfo}>
                     <strong>{post.author.name}</strong>
                     <span>{post.author.role}</span>
                  </div>
               </div>

               <time
                  title={publishedDateFormatted}
                  dateTime={post.publishedAt.toISOString()}>

                  {publishedDateRelativeToNow}
               </time>
            </header>

            <div className={styles.content}>
               {post.content.map(line => {
                  if (line.type === 'paragraph') {
                     if (line.content.includes('</a>')) {
                        return <LinkComponent key={line.content} content={line.content} />
                     } else {
                        return <p key={line.content}>{line.content}</p>
                     }
                  }
               })}
            </div>

            <form
               onSubmit={handleCreateNewComment}
               className={styles.commentForm}
            >
               <strong>Deixe seu feedback</strong>

               <textarea
                  name="comment"
                  onChange={handleNewCommentChange}
                  value={newCommentText}
                  placeholder="Deixe um comentário"
                  onInvalid={handleNewCommentInvalid}
                  required
               />

               <footer>
                  <button
                     type="submit"
                     disabled={isNewCommentEmpty}
                  >
                     Publicar
                  </button>
               </footer>
            </form>

            <div className={styles.commentList}>
               {comments.map(comment => {
                  return (
                     <Comment
                        key={comment.id}
                        comment={comment}
                        onDeleteComment={deleteComment}
                     />
                  )
               })}
            </div>
         </article>
      </>
   )
}
