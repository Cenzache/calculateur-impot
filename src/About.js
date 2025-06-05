import React from 'react';
import { ArrowLeft, Target, Calculator, TrendingUp, Shield } from 'lucide-react';

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
          
          {/* Disclaimer de transparence */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
            <p className="text-sm text-amber-800 mb-0">
              <strong>⚠️ Note de transparence :</strong> Cette page "À propos" a un double objectif : vous expliquer le projet et optimiser le référencement Google de ce calculateur d'impôt. Le style d'écriture est donc adapté au SEO (répétition de mots-clés, formulations spécifiques), ce qui peut rendre la lecture moins fluide qu'un texte naturel. Pour une présentation plus directe du projet, consultez{' '}
              <a 
                href="https://www.reddit.com/user/Cenzache/comments/1l3y13f/calculateur_impôt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-900 underline hover:text-amber-700"
              >
                mon post Reddit original
              </a>.
            </p>
          </div>

          {/* Hero section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Calculateur d'impôt 2025 gratuit : simulation fiscale personnalisée
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Un <strong>simulateur d'impôt sur le revenu</strong> simple créé avec Claude AI pour mieux comprendre ses avis d'imposition et faire des prévisionnels rapides.
            </p>
          </header>

          {/* Sections principales */}
          <div className="space-y-16">
            
            {/* Genèse du projet */}
            <section>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Pourquoi j'ai créé ce calculateur d'impôt 2025 ?</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                J'ai développé ce <strong>calculateur d'impôt gratuit</strong> avec l'aide de Claude AI pour une raison personnelle : mieux comprendre mes propres <strong>avis d'imposition</strong> et pouvoir faire des <strong>prévisionnels fiscaux</strong> précis. Au lieu de garder cet outil pour moi, je me suis dit que ça pourrait servir à d'autres contribuables français dans la même situation.
              </p>

              <p className="text-gray-700 leading-relaxed">
                L'objectif n'est pas de concurrencer le <strong>simulateur officiel des impôts</strong>, mais plutôt d'avoir un <strong>outil de simulation fiscale</strong> simple pour se faire rapidement une idée. Par exemple avant une <strong>négociation de salaire</strong>, si l'on souhaite faire quelques <strong>investissements locatifs</strong>, ou même pour calculer l'impact fiscal de frais de garde d'enfant.
              </p>
            </section>

            {/* Fonctionnalités */}
            <section>
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Fonctionnalités du simulateur impôt 2025</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Calcul multi-années précis</h3>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Barème fiscal 2024</strong> : calcul impôt sur revenus 2023</li>
                      <li><strong>Barème fiscal 2025</strong> : calcul impôt sur revenus 2024</li>
                      <li><strong>Projection 2026</strong> : estimation impôt sur revenus 2025</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestion complète de la situation familiale</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li><strong>Quotient familial</strong> : célibataire, marié/pacsé</li>
                        <li><strong>Enfants à charge</strong> : calcul automatique des parts fiscales</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li><strong>Déductions professionnelles</strong> : forfait 10% ou frais réels</li>
                        <li><strong>Revenus fonciers</strong> : intégration revenus locatifs nets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Comparaison avec votre situation actuelle</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Prélèvement à la source</strong> : comparaison avec votre taux actuel</li>
                      <li><strong>Estimation mensuelle</strong> : répartition de l'impôt annuel</li>
                      <li><strong>Taux effectif d'imposition</strong> : calcul du taux réel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitations */}
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Limites techniques du calculateur fiscal</h2>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <p className="text-orange-900 font-medium mb-2">
                  Problème en cours de résolution :
                </p>
                <p className="text-orange-800">
                  La <strong>décote automatique</strong> n'est pas parfaitement implémentée - les paramètres officiels de l'administration fiscale sont particulièrement complexes. Je travaille sur cette amélioration, mais si quelqu'un maîtrise ces calculs spécifiques selon le <strong>Code général des impôts</strong>, je serais reconnaissant pour des conseils techniques.
                </p>
              </div>
            </section>

            {/* Évolutions futures */}
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Évolutions prévues du simulateur d'impôt</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                N'ayant personnellement pas beaucoup de types de revenus différents, j'ai du mal à imaginer d'autres profils d'utilisateurs. C'est pourquoi je cherche des retours sur les <strong>fonctionnalités fiscales</strong> prioritaires :
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-gray-900">Nouvelles simulations</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Changement de situation</strong> : mariage, divorce, naissance</li>
                    <li>• <strong>Autres revenus</strong> : dividendes, plus-values mobilières</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-gray-900">Optimisation fiscale</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Réductions d'impôt</strong> : dons, investissement PME</li>
                    <li>• <strong>Défiscalisation</strong> : PER, Pinel, LMNP</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Transparence */}
            <section>
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-gray-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Transparence sur le développement</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ce <strong>calculateur d'impôt en ligne</strong> a été développé avec l'assistance de Claude AI. Il utilise les <strong>barèmes fiscaux officiels 2025</strong> publiés par Bercy mais reste un <strong>outil d'estimation indicatif</strong>. Pour des calculs définitifs de votre <strong>déclaration de revenus</strong>, référez-vous toujours au <strong>simulateur officiel impots.gouv.fr</strong>.
              </p>


            </section>

            {/* Complémentarité */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complémentarité avec les outils officiels</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Ce <strong>simulateur d'impôt 2025</strong> complète sans remplacer :
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-2xl mb-3">🏛️</div>
                  <h3 className="font-semibold mb-2">Simulateur officiel</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>impots.gouv.fr</strong> pour les calculs définitifs
                  </p>
                  <a 
                    href="https://www.impots.gouv.fr/simulateurs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Accéder au simulateur →
                  </a>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="text-2xl mb-3">💼</div>
                  <h3 className="font-semibold mb-2">Simulateur Urssaf</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculs <strong>net/brut</strong> et charges sociales
                  </p>
                  <a 
                    href="https://mon-entreprise.urssaf.fr/simulateurs-et-assistants"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Accéder au simulateur →
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* CTA final */}
          <div className="text-center mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vos retours sont précieux !
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              N'hésitez pas à partager vos suggestions et besoins d'évolution sur mon post Reddit dédié.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onBack}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Tester le calculateur →
              </button>
              <a
                href="https://www.reddit.com/user/Cenzache/comments/1l3y13f/calculateur_impôt/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Voir le post Reddit →
              </a>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Calculateur d'impôt • <strong>Estimation indicative</strong> • 
            Données basées sur les <strong>barèmes fiscaux officiels</strong> • 
            Développé avec Claude AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
