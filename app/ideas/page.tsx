import { previewData } from "next/headers"
import { groq } from 'next-sanity'
import { client } from "../libs/sanity.client"
import PreviewSuspense from "../components/sanity/PreviewSuspense"
import PreviewBlogList from "../components/sanity/PreviewBlogList"
import BlogList from "../components/sanity/BlogList"
import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
const query = groq`
*[_type=="post"] {
  ...,
  author->,
  categories[]->,
} | order(_createdAt desc)
`


export default async function IdeaHomePage() {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Não autorizado"
          subtitle="Por favor faça login"
        />
      </ClientOnly>
    )
  }

  if (previewData()) {
    <PreviewSuspense
      fallback={
        <div role="status">
          <p className="text-center text-lg animate-pulse text-[#f7ab0a]">
            Loading Preview Data
          </p>
        </div>
      }
    >
      <PreviewBlogList query={query} />
    </PreviewSuspense>
  }

  const posts = await client.fetch(query)
  return (
    <div className="max-w-7xl mx-auto" >
      <BlogList posts={posts} />
    </div>
  )
}

