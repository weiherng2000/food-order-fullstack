/** @type {import('next').NextConfig} */
const nextConfig = {
    //to add google account images 
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'*.googleusercontent.com',
               
            },
            {
                protocol:'https',
                hostname:'food-ordering-wh.s3.amazonaws.com',
            },
        ],
        domains:[
            'food-ordering-wh.s3.amazonaws.com',
            '.googleusercontent.com'

        ],
    }
}

module.exports = nextConfig
