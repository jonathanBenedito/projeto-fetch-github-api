import { eventsQuantity } from "../variables.js"

const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: 0,
    following: 0,
    repositories: [],
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setRepositories(repositories){
        this.repositories = repositories
    },
    setEvents(events){
        const filteredEvents = events.filter((event) => {
            if(event.type === "CreateEvent") {
                return event.message = `Create ${event.payload.ref_type}`                   
            } else if(event.type === "PushEvent") {
                return event.payload.commits.length > 0 ? 
                event.message = event.payload.commits[0].message 
                : ''
            }
        })

        this.events = filteredEvents.slice(0, eventsQuantity)
    }
}

export { user }