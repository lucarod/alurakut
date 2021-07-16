import { SiteClient } from 'datocms-client'

export default async function requestReceiver(req, res) {
  if(req.method === 'POST') {
    const TOKEN = 'be617a8be84a78dcf5807d73c905dd'
    const client = new SiteClient(TOKEN)

    // Validar os dados antes de sair cadastrando
    const createdRecord = await client.items.create({
      itemType: "972018", // Community Model ID 
      ...req.body,
    })
    
    res.json({
      data: "Algum dado qualquer",
      createdRecord: createdRecord,
    })

    return
  }
  res.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}