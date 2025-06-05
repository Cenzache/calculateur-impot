import React from 'react';
import { ArrowLeft, Shield, Eye, Cookie, UserCheck } from 'lucide-react';

const PolitiqueConfidentialite = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header avec navigation */}
      <header className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au calculateur
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-none">
          
          {/* Hero section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Protection de vos données personnelles sur calculateur-impot.fr
            </p>
          </header>

          <div className="space-y-12">
            
            {/* Principe général */}
            <section>
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Principe de confidentialité</h2>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="space-y-4 text-green-900">
                  <p className="font-semibold text-lg">
                    🔒 Aucune donnée personnelle collectée
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    <li>• Vos calculs d'impôt restent <strong>entièrement privés</strong></li>
                    <li>• Aucun salaire, situation familiale ou donnée fiscale n'est transmise</li>
                    <li>• Tous les calculs s'effectuent <strong>localement dans votre navigateur</strong></li>
                    <li>• Pas d'inscription, pas de compte utilisateur</li>
                    <li>• Respect total du RGPD par design</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Données collectées */}
            <section>
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Données collectées</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    ✅ Ce que nous ne collectons PAS
                  </h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Vos salaires et revenus saisis</li>
                    <li>• Votre situation familiale</li>
                    <li>• Vos calculs d'impôt</li>
                    <li>• Votre adresse email ou coordonnées</li>
                    <li>• Votre adresse IP pour identification</li>
                    <li>• Vos habitudes de navigation détaillées</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    📊 Données techniques anonymes (éventuelles)
                  </h3>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <p>
                      Si des outils d'analyse sont ajoutés à l'avenir (Google Analytics, etc.), 
                      seules des données <strong>anonymes et agrégées</strong> pourront être collectées :
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Nombre de visiteurs du site (sans identification)</li>
                      <li>• Pages consultées (sans contenu des calculs)</li>
                      <li>• Origine géographique générale (pays/région)</li>
                      <li>• Type d'appareil utilisé (mobile/desktop)</li>
                    </ul>
                    <p className="font-medium text-gray-900">
                      Aucune donnée permettant de vous identifier personnellement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-center mb-6">
                <Cookie className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Cookies et stockage local</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-900 mb-4">
                    🍪 Utilisation actuelle des cookies
                  </h3>
                  <div className="space-y-3 text-orange-800 text-sm">
                    <p><strong>Cookies strictement nécessaires :</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Aucun cookie de session ou de tracking actuellement</li>
                      <li>• Possibles cookies techniques pour le fonctionnement du site</li>
                    </ul>
                    
                    <p className="mt-4"><strong>Stockage local :</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Vos calculs peuvent être temporairement stockés dans votre navigateur</li>
                      <li>• Ces données restent sur votre appareil uniquement</li>
                      <li>• Supprimées en fermant l'onglet ou vidant le cache</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">
                    ⚠️ Évolution possible
                  </h3>
                  <p className="text-amber-800 text-sm">
                    Si des cookies d'analyse ou de publicité sont ajoutés à l'avenir, 
                    un bandeau de consentement sera affiché et cette politique mise à jour.
                  </p>
                </div>
              </div>
            </section>

            {/* Sécurité */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sécurité des données</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Protection par conception :</strong> La meilleure protection de vos données 
                  est de ne pas les collecter. Ce principe guide la conception de cet outil.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">🔐 Côté technique</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Site servi en HTTPS (chiffrement)</li>
                      <li>• Hébergement sécurisé (Vercel)</li>
                      <li>• Code côté client uniquement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">👤 Côté utilisateur</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Vos données restent sur votre appareil</li>
                      <li>• Aucune transmission de données sensibles</li>
                      <li>• Contrôle total de vos informations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Droits RGPD */}
            <section>
              <div className="flex items-center mb-6">
                <UserCheck className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Vos droits (RGPD)</h2>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="space-y-4 text-purple-900">
                  <p className="font-semibold">
                    En l'absence de collecte de données personnelles, vos droits RGPD sont de facto respectés :
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="space-y-2">
                        <li>• <strong>Droit d'accès :</strong> Aucune donnée à consulter</li>
                        <li>• <strong>Droit de rectification :</strong> Aucune donnée à corriger</li>
                        <li>• <strong>Droit d'effacement :</strong> Aucune donnée à supprimer</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2">
                        <li>• <strong>Droit d'opposition :</strong> Aucun traitement en cours</li>
                        <li>• <strong>Droit à la portabilité :</strong> Aucune donnée à transférer</li>
                        <li>• <strong>Droit de limitation :</strong> Aucun traitement à limiter</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-sm mt-4">
                    Si cette situation évoluait, ces droits deviendraient pleinement exercables 
                    via le <a href="https://www.reddit.com/user/Cenzache/comments/1l3y13f/calculateur_impôt/" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">post Reddit dédié</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Services tiers */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Services tiers</h2>
              
              <div className="space-y-4 text-gray-700">
                <p><strong>Actuellement :</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Vercel :</strong> Hébergement du site (politique de confidentialité Vercel)</li>
                  <li>• <strong>Cloudflare :</strong> Possible CDN pour la performance (politique Cloudflare)</li>
                </ul>
                
                <p><strong>Services futurs possibles :</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Google Analytics : analyse du trafic (anonymisé)</li>
                  <li>• Google AdSense : affichage de publicités</li>
                </ul>
                
                <p className="text-sm bg-gray-100 p-4 rounded-lg">
                  <strong>Engagement :</strong> Tout ajout de service tiers sera accompagné 
                  d'une mise à jour de cette politique et d'un consentement approprié si nécessaire.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact et questions</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Questions sur cette politique de confidentialité :</strong>
                  </p>
                  <p>
                    Utilisez les commentaires du <a href="https://www.reddit.com/user/Cenzache/comments/1l3y13f/calculateur_impôt/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">post Reddit dédié au projet</a>
                  </p>
                  <p className="text-sm">
                    Réponse garantie pour toute question relative à la protection de vos données.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Mises à jour */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mises à jour de cette politique</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Cette politique de confidentialité peut être mise à jour pour refléter 
                les évolutions du site ou de la réglementation.
              </p>
              <p>
                Toute modification significative sera communiquée via le site et le post Reddit.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Version actuelle :</strong> Juin 2025 • <strong>Première version :</strong> Juin 2025
              </p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Calculateur d'impôt • Politique de confidentialité • 
            <button onClick={onBack} className="hover:text-gray-700 ml-1 underline">
              Retour au calculateur
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PolitiqueConfidentialite;