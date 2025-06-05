import React from 'react';
import { ArrowLeft, Scale, Server, Mail } from 'lucide-react';

const MentionsLegales = ({ onBack }) => {
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
              Mentions Légales
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Informations légales relatives au site calculateur-impot.fr
            </p>
          </header>

          <div className="space-y-12">
            
            {/* Éditeur du site */}
            <section>
              <div className="flex items-center mb-6">
                <Scale className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Éditeur du site</h2>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="space-y-3 text-gray-800">
                  <p><strong>Site web :</strong> calculateur-impot.fr</p>
                  <p><strong>Nature :</strong> Calculateur d'impôt gratuit et outil d'estimation fiscale</p>
                  <p><strong>Statut :</strong> Site personnel non commercial</p>
                  <p><strong>Contact :</strong> Via le <a href="https://www.reddit.com/user/Cenzache/comments/1l3y13f/calculateur_impôt/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">post Reddit dédié</a></p>
                </div>
              </div>
            </section>

            {/* Hébergement */}
            <section>
              <div className="flex items-center mb-6">
                <Server className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Hébergement</h2>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="space-y-3 text-gray-800">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">vercel.com</a></p>
                </div>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Propriété intellectuelle</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Le contenu de ce site (design, textes, algorithmes de calcul) est développé par l'éditeur avec l'assistance de Claude AI (Anthropic).
                </p>
                
                <p>
                  Les <strong>barèmes fiscaux</strong> utilisés sont issus des publications officielles de l'administration fiscale française et sont dans le domaine public.
                </p>
                
                <p>
                  Le code source utilise des bibliothèques open source (React, Tailwind CSS, Lucide React) sous leurs licences respectives.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitation de responsabilité</h2>
              
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <div className="space-y-4 text-amber-900">
                  <p className="font-semibold">
                    ⚠️ Important : Outil d'estimation indicative uniquement
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    <li>• Ce calculateur fournit des <strong>estimations indicatives</strong> basées sur les barèmes fiscaux officiels</li>
                    <li>• Il ne remplace en aucun cas un calcul officiel ou un conseil fiscal professionnel</li>
                    <li>• L'éditeur ne peut être tenu responsable d'erreurs de calcul ou d'interprétation</li>
                    <li>• Pour un calcul définitif, utilisez le <strong>simulateur officiel impots.gouv.fr</strong></li>
                    <li>• Consultez un expert-comptable pour des situations complexes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Données et vie privée */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Données personnelles</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Ce site ne collecte <strong>aucune donnée personnelle</strong>. Tous les calculs sont effectués localement dans votre navigateur.
                </p>
                
                <p>
                  Aucune information saisie (salaires, situation familiale, etc.) n'est transmise, stockée ou analysée par le site.
                </p>
                
                <p>
                  Pour plus de détails, consultez notre <button onClick={() => window.location.href = '#privacy'} className="text-blue-600 underline">Politique de Confidentialité</button>.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <div className="flex items-center mb-6">
                <Mail className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Contact et signalement</h2>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="space-y-3 text-purple-900">
                  <p>
                    <strong>Questions, suggestions ou signalement d'erreurs :</strong>
                  </p>
                  <p>
                    Utilisez les commentaires du <a href="https://www.reddit.com/user/Cenzache/comments/1l3y13f/calculateur_impôt/" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline font-medium">post Reddit dédié au projet</a>
                  </p>
                  <p className="text-sm">
                    Les retours et suggestions d'amélioration sont les bienvenus pour faire évoluer cet outil.
                  </p>
                </div>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Droit applicable</h2>
              
              <div className="text-gray-700">
                <p>
                  Les présentes mentions légales sont soumises au droit français. 
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </section>
          </div>

          {/* Mise à jour */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : Juin 2025
            </p>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Calculateur d'impôt • Mentions légales • 
            <button onClick={onBack} className="hover:text-gray-700 ml-1 underline">
              Retour au calculateur
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MentionsLegales;