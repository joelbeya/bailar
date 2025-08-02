/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activer le mode strict pour le rendu côté client
  reactStrictMode: true,
  
  // Désactiver l'optimisation des images pour le déploiement initial
  images: {
    unoptimized: true,
  },
  
  // Forcer le mode de rendu côté serveur pour le déploiement initial
  output: 'standalone',
  
  // Désactiver les vérifications TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Désactiver les vérifications ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
