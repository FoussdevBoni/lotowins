export function verifierHeureCloture(heureCloture, minutesCloture) {
    let now = new Date();
    let heureActuelle = now.getUTCHours();
    let minutesActuelles = now.getUTCMinutes();

    return (heureActuelle > heureCloture || (heureActuelle === heureCloture && minutesActuelles >= minutesCloture));
}
