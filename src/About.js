import React from 'react';
import { ArrowLeft, Target, Users, TrendingUp, Calculator } from 'lucide-react';

const About = ({ onBack }) => {
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
              À propos de Calculateur-Impot.fr
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Notre mission : démocratiser l'accès au calcul d'impôt sur le revenu et améliorer 
              votre rapport aux finances personnelles grâce à des outils simples et gratuits.
            </p>
          </header>

          {/* Sections principales */}
          <div className="space-y-16">
            {/* Mission */}
            <section>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <p className="text-lg text-blue-900 font-medium">
                  Rendre accessible le calcul d'impôt pour avoir un meilleur rapport à ses finances personnelles
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Le <strong>calcul d'impôt sur le revenu</strong> reste complexe pour de nombreux Français. 
                Entre les barèmes fiscaux qui évoluent chaque année, les déductions professionnelles, 
                le quotient familial et les différents revenus, il devient difficile d'estimer son 
                <strong> impôt </strong> ou de planifier ses finances personnelles.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                C'est pourquoi nous avons créé ce <strong>simulateur d'impôt gratuit</strong> : 
                un outil simple, rapide et précis qui vous permet d'obtenir une 
                <strong> estimation de votre impôt</strong> en quelques clics seulement. 
                Contrairement aux simulateurs officiels souvent complexes, notre 
                <strong> calculateur d'impôt</strong> privilégie la simplicité sans sacrifier la précision.
              </p>
            </section>

            {/* Pourquoi ce projet */}
            <section>
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Pourquoi ce projet ?</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Les <strong>finances personnelles</strong> sont la base d'une vie équilibrée, 
                mais l'éducation financière reste insuffisante en France. Beaucoup de personnes 
                découvrent le montant de leur <strong>prélèvement à la source</strong> sur leur 
                fiche de paie sans vraiment comprendre comment il est calculé.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-900 mb-3">
                    🎯 Simplicité avant tout
                  </h3>
                  <p className="text-green-800">
                    Notre <strong>calculateur fiscal</strong> vous donne une estimation 
                    en 30 secondes, sans inscription ni données personnelles stockées.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    📊 Transparence totale
                  </h3>
                  <p className="text-blue-800">
                    Nous utilisons les <strong>barèmes fiscaux officiels 2024 et 2025</strong> 
                    et expliquons chaque étape du calcul de votre impôt.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Ce site représente un premier pas vers une gamme complète d'outils de 
                <strong> gestion financière personnelle</strong>. Notre vision : vous accompagner 
                dans toutes les étapes de votre vie financière, de l'estimation fiscale 
                à l'optimisation de votre épargne.
              </p>
            </section>

            {/* Comment ça marche */}
            <section>
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Comment fonctionne notre calculateur ?</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Notre <strong>simulateur d'impôt 2025</strong> applique la méthode officielle 
                de calcul de l'administration fiscale française, en prenant en compte :
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <span><strong>Barèmes d'imposition 2024 et 2025</strong> avec les tranches marginales officielles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <span><strong>Déductions professionnelles</strong> : forfait 10% ou frais réels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <span><strong>Quotient familial</strong> selon votre situation matrimoniale et nombre d'enfants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <span><strong>Revenus fonciers</strong> pour les propriétaires investisseurs</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Le calcul s'effectue en temps réel et vous obtenez votre <strong>estimation d'impôt</strong> 
                annuelle ainsi que le montant mensuel de <strong>prélèvement à la source</strong> estimé. 
                Notre algorithme reproduit fidèlement la méthode de calcul officielle pour vous offrir 
                une estimation fiable de votre <strong>impôt sur le revenu</strong>.
              </p>
            </section>

            {/* Vision future */}
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Notre vision pour l'avenir</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ce <strong>calculateur d'impôt gratuit</strong> n'est que le début. 
                Nous travaillons sur une suite complète d'outils pour vous accompagner 
                dans la gestion de vos <strong>finances personnelles</strong> :
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-2xl mb-3">📈</div>
                  <h3 className="font-semibold mb-2">Optimisation fiscale</h3>
                  <p className="text-sm text-gray-600">
                    Conseils personnalisés pour réduire légalement votre impôt
                  </p>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-2xl mb-3">💰</div>
                  <h3 className="font-semibold mb-2">Simulation d'épargne</h3>
                  <p className="text-sm text-gray-600">
                    Calculateurs pour PEL, Livret A, assurance-vie
                  </p>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-2xl mb-3">🏠</div>
                  <h3 className="font-semibold mb-2">Investissement immobilier</h3>
                  <p className="text-sm text-gray-600">
                    Simulateurs de rendement locatif et défiscalisation
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <p className="text-orange-900 font-medium mb-2">
                  🚀 Objectif 2025 : Devenir votre assistant financier personnel
                </p>
                <p className="text-orange-800">
                  Une plateforme complète pour calculer, optimiser et planifier 
                  tous les aspects de vos finances, de l'impôt à l'investissement.
                </p>
              </div>
            </section>

            {/* Engagement qualité */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre engagement</h2>
              
              <div className="bg-gray-900 text-white p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">
                      🔒 Confidentialité garantie
                    </h3>
                    <p className="text-gray-300">
                      Vos données ne sont jamais stockées. Calculs effectués 
                      localement dans votre navigateur.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-green-400">
                      📊 Précision maximale
                    </h3>
                    <p className="text-gray-300">
                      Barèmes officiels mis à jour, algorithmes vérifiés, 
                      estimations fiables pour votre planification financière.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* CTA final */}
          <div className="text-center mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à calculer votre impôt 2025 ?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Utilisez notre <strong>calculateur d'impôt gratuit</strong> pour obtenir 
              une estimation précise de votre impôt sur le revenu en quelques clics.
            </p>
            <button 
              onClick={onBack}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Commencer mon estimation →
            </button>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Calculateur-Impot.fr • Estimation indicative • 
            Données basées sur les barèmes fiscaux officiels
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
