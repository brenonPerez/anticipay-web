import { Helmet } from 'react-helmet-async'

import { ReceivablesCard } from './receivables-card'

export function Receivables() {
  return (
    <>
      <Helmet>
        <title>Antecipação de Recebíveis</title>
      </Helmet>
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Antecipação de Recebíveis
        </h1>
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ReceivablesCard key={i} />
          ))}
        </div>
      </div>
    </>
  )
}
