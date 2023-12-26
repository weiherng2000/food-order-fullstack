/** @type {import('next').NextConfig} */
const nextConfig = {
    //to add google account images 
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'*.googleusercontent.com',
               
            },
        ]
    }
}

module.exports = nextConfig
