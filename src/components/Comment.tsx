import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
   content: string;
   onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

   const [likeCount, setLikeCount] = useState(0)

   function handleDeleteComment() {
      onDeleteComment(content)
   }

   function handleLikeComment() {
      //setLikeCount(likeCount + 1)
      setLikeCount((state) => {
         return state + 1
      })
   }

   return (
      <>
         <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/renatodlm.png" />

            <div className={styles.commentBox}>
               <div className={styles.commentContent}>
                  <header>
                     <div className={styles.authorAndTime}>
                        <strong>Renato Marques</strong>

                        <time title="26 de Agosto às 18:56h" dateTime="2023-08-26 18:56:16">
                           Cerca de 1h atrás
                        </time>
                     </div>

                     <button onClick={handleDeleteComment} title="Deletar comentário">
                        <Trash size={20} />
                     </button>
                  </header>

                  <p>{content}</p>
               </div>

               <footer>
                  <button onClick={handleLikeComment}>
                     <ThumbsUp />
                     Aplaudir <span>{likeCount}</span>
                  </button>
               </footer>
            </div>
         </div>
      </>
   )
}
