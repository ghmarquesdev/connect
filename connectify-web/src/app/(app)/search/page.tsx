import Image from 'next/image'
import type { Metadata } from 'next'

import searchEngines from '@/public/images/search-engines.svg'
import { searchUsers } from '@/http/search-users'
import { searchPosts } from '@/http/search-posts'
import { Grid } from '@/components/pages/search/grid'

export const metadata: Metadata = {
  title: 'Pesquisar | connectify',
}

type SearchProps = {
  searchParams: { q: string }
}

export default async function Search({ searchParams: { q } }: SearchProps) {
  const [users, posts] = await Promise.all([
    searchUsers({ query: q }),
    searchPosts({ query: q }),
  ])

  if (!posts && !users) {
    return (
      <section className="flex m-auto max-w-[750px] flex-col items-center py-5 px-5 sm:px-10">
        <div className="w-full overflow-hidden px-7 py-5 flex flex-col bg-background rounded-md border border-foreground/20">
          <Image
            src={searchEngines}
            alt="Pesquisar novamente"
            className="max-w-full sm:max-w-96 m-auto"
          />

          <h2 className="mt-5 text-center text-foreground text-medium mb-2 text-xl">
            Nenhum resultado foi encontrado
          </h2>

          <p className="text-base text-center text-foreground/70">
            Tente diminuir ou reescrever seus termos de pesquisa.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col items-center py-5 px-5 sm:px-10">
      <Grid posts={posts.posts} users={users.users} query={q} />
    </section>
  )
}
