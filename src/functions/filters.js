
import formaterDateISO8601 from './formatDate'

export function ticketsByFormule(data, targetFormule) {
  const filteredTicket = data.filter((ticket) =>
    ticket.formule.toLowerCase().includes(targetFormule.toLowerCase())
  );

  return filteredTicket}


export function ticketsByTirage(data, targetTirage) {
    const filteredTicket = data.filter((ticket) =>
    ticket.tirage.toLowerCase().includes(targetTirage.toLowerCase())
  );

  return filteredTicket
}


export function ticketsByDate(data, targetDate) {
    const filteredTicket = data.filter((ticket) =>

   formaterDateISO8601(ticket.dateHeureEnregistrement).includes(targetDate)

  );

  return filteredTicket
}



export function ticketsByStatus(data , targetStatus){
    const filteredTicket = data.filter((ticket) =>
    ticket.status.includes(targetStatus)
  );
  return filteredTicket
}

export function usersById(data , targetUsername){
    const filteredUser = data.filter((user) =>
    user.username.includes(targetUsername)
  );
  return filteredUser
}