export {default} from "next-auth/middleware";

export const config = {
    matcher: ['/dashboard', '/canciones', '/cuento',
        '/granja','/isla','/jardin','/lecciones','/abecedario',
        '/animales', '/animalesquiz', '/animalesquizdos', '/juego1',
        '/juego2', '/juego3', '/quizabc', '/quizabcdos','/quizcolores',
        '/quizcoloresdos'
    ]
}