export {default} from "next-auth/middleware";

export const config = {
    matcher: ['/dashboard', '/canciones', '/cuento',
        '/granja','/isla','/jardin','/lecciones',
    ]
}