import { Post, PostType } from './components/Post'
import { Header } from './components/Header'

import styles from './App.module.css'
import './assets/css/global.css'
import { Sidebar } from './components/Sidebar'

const posts: PostType[] = [
   {
      id: 1,
      author: {
         avatarUrl: 'https://github.com/renatodlm.png',
         name: 'Renato Marques',
         role: 'Web Developer'
      },
      content: [
         { type: 'paragraph', content: 'Fala galeraa 👋' },
         { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
         { type: 'paragraph', content: '👉 <a href="https://jane.design/doctorcare">jane.design/doctorcare</a>' },
         { type: 'paragraph', content: '<a href="https://novoprojeto.com.br" target="_blank">#novoprojeto</a> <a href="#nlw" target="_blank">#nlw</a> <a href="#rocketseat">#rocketseat</a>' },
      ],
      publishedAt: new Date('2023-08-26 18:56:00')
   },
   {
      id: 2,
      author: {
         avatarUrl: 'https://github.com/marcocianci.png',
         name: 'Marco Cianci',
         role: 'Web Developer'
      },
      content: [
         { type: 'paragraph', content: 'Fala galeraa 👋' },
         { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
         { type: 'paragraph', content: '👉 <a href="https://jane.design/doctorcare">jane.design/doctorcare</a>' },
         { type: 'paragraph', content: '<a href="https://novoprojeto.com.br" target="_blank">#novoprojeto</a> <a href="#nlw" target="_blank">#nlw</a> <a href="#rocketseat">#rocketseat</a>' },
      ],
      publishedAt: new Date('2023-08-26 18:56:00')
   }
]

function App() {
   return (
      <>
         <Header />

         <div className={styles.wrapper}>
            <Sidebar />
            <main>
               {posts.map(post => {
                  return (
                     <Post
                        key={post.id}
                        post={post}
                     />
                  )
               })}
            </main>
         </div>
      </>
   )
}

export default App
