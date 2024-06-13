import { ReactNode } from 'react'
import { Header } from '../../components/shared/header/header'
import { InformationsAccount } from '../../components/pages/feed/informations-account'
import { Suggestions } from '../../components/shared/suggestions'

type FeedLayoutProps = {
  children: ReactNode
}

export default async function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <div className="pt-24 flex-1 h-full grid grid-cols-1 lg:grid-cols-[280px_1fr_286px]">
        <div className="hidden pl-5 sm:flex justify-between lg:block">
          <div className="hidden pl-5 sm:block mx-auto">
            <InformationsAccount />
          </div>

          <div className="hidden pr-5 sm:block lg:hidden mx-auto">
            <Suggestions />
          </div>
        </div>

        <div>{children}</div>

        <div className="hidden pr-5 lg:block mx-auto">
          <Suggestions />
        </div>
      </div>
    </div>
  )
}
