import { maxItems } from "../variables.js"

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderData(user) {
        this.renderUser(user)
        this.renderRepositories(user.repositories)
        this.renderEvents(user.events)
    },
    renderUser(user) {
        this.userProfile.innerHTML =    `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                                <div class="data">
                                                    <h1>${user.name ?? 'Não possui nome cadastrado... 😢'}</h1>
                                                    <p class="login">${user.userName}</p>
                                                    <p class="bio">${user.bio ?? 'Não possui bio cadastrado... 😢'}</p>
                                                    <p>👥 Seguidores: <b>${user.followers}</b></p>
                                                    <p>👤 Seguindo: <b>${user.following}</b></p>
                                                </div>
                                        </div>`
    },
    renderRepositories(repositories) {
        let repositoriesItens = ''
        repositories.forEach(repo => repositoriesItens +=   `<li>
                                                                <a href="${repo.html_url}" target="_blank">
                                                                    <p>${repo.name}</p>
                                                                    <div class="repository-info">
                                                                        <div class="info-item">🍴 ${repo.forks_count}</div>
                                                                        <div class="info-item">⭐ ${repo.stargazers_count}</div>
                                                                        <div class="info-item">👀 ${repo.watchers_count}</div>
                                                                        <div class="info-item">
                                                                            👩‍💻 ${repo.language ?? 'Sem Linguagem'}
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>`)
    
        if(repositories.length > 0) {
            this.userProfile.innerHTML +=   `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                             </div>`
        }
    },
    renderEvents(events) {
        let eventsItens = ''
        const filteredEvents = events.filter(event => event.type === "CreateEvent" || event.type === "PushEvent")
        filteredEvents.slice(0, maxItems)
        .forEach(event => eventsItens +=    `<li>
                                                <p>
                                                    <b>${event.repo.name}</b>
                                                    - ${event.payload.commits?.[0]?.message ??
                                                    `Create ${event.payload.ref_type}`}
                                                </p>
                                            </li>`)
        
        if(filteredEvents.length > 0) {
            this.userProfile.innerHTML +=   `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        } else {
            this.userProfile.innerHTML +=   `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>Não possui eventos... 😢</ul>
                                            </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }