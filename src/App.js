import { Analytics } from '@vercel/analytics/react';
import React, { useState, useMemo } from 'react';
import { Calculator, User, FileText, Info } from 'lucide-react';
import About from './About';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';

const TaxEstimator = () => {
  const [currentView, setCurrentView] = useState('calculator'); // 'calculator', 'about', 'mentions', 'privacy'
  const [selectedYear, setSelectedYear] = useState(2026);
  const [salary, setSalary] = useState('');
  const [currentTax, setCurrentTax] = useState('');
  const [familySituation, setFamilySituation] = useState('single');
  const [children, setChildren] = useState(0);
  const [deductionType, setDeductionType] = useState('standard10');
  const [realCosts, setRealCosts] = useState('');
  const [rentalIncome, setRentalIncome] = useState('');

  // Barèmes d'imposition par année d'avis (logique corrigée : avis utilise barème de l'année d'avis)
  const taxBracketsByYear = {
    2024: [ // Avis 2024 - barème 2024 (revenus 2023)
      { min: 0, max: 11294, rate: 0 },
      { min: 11294, max: 28797, rate: 0.11 },
      { min: 28797, max: 82341, rate: 0.30 },
      { min: 82341, max: 177106, rate: 0.41 },
      { min: 177106, max: Infinity, rate: 0.45 }
    ],
    2025: [ // Avis 2025 - barème 2025 (revenus 2024)
      { min: 0, max: 11497, rate: 0 },
      { min: 11497, max: 29315, rate: 0.11 },
      { min: 29315, max: 83823, rate: 0.30 },
      { min: 83823, max: 180294, rate: 0.41 },
      { min: 180294, max: Infinity, rate: 0.45 }
    ],
    2026: [ // Avis 2026 - barème 2026 (revenus 2025) - projection
      { min: 0, max: 11700, rate: 0 },
      { min: 11700, max: 29850, rate: 0.11 },
      { min: 29850, max: 85300, rate: 0.30 },
      { min: 85300, max: 183500, rate: 0.41 },
      { min: 183500, max: Infinity, rate: 0.45 }
    ]
  };

  // Déductions forfaitaires par année
  const deductionLimitsByYear = {
    2024: { min: 460, max: 13267 },
    2025: { min: 464, max: 13522 },
    2026: { min: 472, max: 13779 } // estimation
  };

  const taxBrackets = taxBracketsByYear[selectedYear];
  const deductionLimits = deductionLimitsByYear[selectedYear];

  // Calcul de l'impôt
  const calculateTax = useMemo(() => {
    const netAnnualSalary = parseFloat(salary) || 0;
    const currentTaxWithholding = parseFloat(currentTax) || 0;
    
    if (!netAnnualSalary) return null;

    // Déductions professionnelles
    let deductionAmount = 0;
    if (deductionType === 'standard10') {
      deductionAmount = Math.min(Math.max(netAnnualSalary * 0.10, deductionLimits.min), deductionLimits.max);
    } else if (deductionType === 'realCosts' && realCosts) {
      deductionAmount = parseFloat(realCosts) || 0;
    }
    
    // Calcul du revenu imposable
    let taxableIncome = Math.max(0, netAnnualSalary - deductionAmount);
    const rental = parseFloat(rentalIncome) || 0;
    taxableIncome += rental;

    // Quotient familial
    let familyShares = familySituation === 'married' ? 2 : 1;
    familyShares += children * 0.5;
    
    const quotientFamilial = taxableIncome / familyShares;
    
    // Calcul par tranches
    let taxBeforeFamily = 0;
    for (let bracket of taxBrackets) {
      if (quotientFamilial > bracket.min) {
        const taxableInThisBracket = Math.min(
          quotientFamilial - bracket.min, 
          bracket.max - bracket.min
        );
        taxBeforeFamily += taxableInThisBracket * bracket.rate;
      }
    }
    
    let totalTax = Math.max(0, taxBeforeFamily * familyShares);
    
    // Application de la décote automatique (paramètres officiels Bercy)
    const decoteData = {
      2024: { seuil_celibataire: 1841, seuil_couple: 3045, base_celibataire: 828, base_couple: 1368, taux: 0.4523 },
      2025: { seuil_celibataire: 1929, seuil_couple: 3186, base_celibataire: 873, base_couple: 1444, taux: 0.4523 },
      2026: { seuil_celibataire: 1964, seuil_couple: 3249, base_celibataire: 889, base_couple: 1470, taux: 0.4525 }
    };
    
    const decoteParams = decoteData[selectedYear];
    const isCouple = familySituation === 'married';
    const decoteLimit = isCouple ? decoteParams.seuil_couple : decoteParams.seuil_celibataire;
    const decoteBase = isCouple ? decoteParams.base_couple : decoteParams.base_celibataire;
    
    let decote = 0;
    if (totalTax <= decoteLimit && totalTax > 0) {
      decote = Math.max(0, decoteBase - (decoteParams.taux * totalTax));
      totalTax = Math.max(0, totalTax - decote);
    }
    
    const monthlyTax = totalTax / 12;
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
    
    return {
      totalTax: Math.round(totalTax),
      totalTaxBeforeDecote: Math.round(taxBeforeFamily * familyShares),
      decote: Math.round(decote),
      monthlyTax: Math.round(monthlyTax),
      effectiveRate: Math.round(effectiveRate * 10) / 10,
      currentWithholding: currentTaxWithholding,
      difference: Math.round(totalTax - currentTaxWithholding),
      taxableIncome: Math.round(taxableIncome),
      deductionAmount: Math.round(deductionAmount),
      netAnnualSalary: Math.round(netAnnualSalary),
      rentalIncome: Math.round(rental),
      familyShares: familyShares
    };
  }, [salary, currentTax, familySituation, children, deductionType, realCosts, rentalIncome, selectedYear]);

  // Navigation entre les pages
  if (currentView === 'about') {
    return <About onBack={() => setCurrentView('calculator')} />;
  }
  
  if (currentView === 'mentions') {
    return <MentionsLegales onBack={() => setCurrentView('calculator')} />;
  }
  
  if (currentView === 'privacy') {
    return <PolitiqueConfidentialite onBack={() => setCurrentView('calculator')} />;
  }

  return (
    <div 
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Header avec pub responsive */}
      <div className="w-full">
        <div className="bg-gray-50 border-b border-gray-200 py-2">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              {/* Pub desktop */}
              <div className="hidden md:block w-[728px] h-[90px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                Publicité (728x90)
              </div>
              {/* Pub mobile */}
              <div className="block md:hidden w-[320px] h-[50px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                Publicité (320x50)
              </div>
            </div>
            <button
              onClick={() => setCurrentView('about')}
              className="flex items-center text-gray-600 hover:text-black transition-colors ml-4"
            >
              <Info className="w-4 h-4 mr-1" />
              À propos
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Calculateur d'Impôt sur le Revenu
            </h1>
            
            {/* Sélecteur d'année */}
            <div className="flex justify-center mb-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedYear(2024)}
                  className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                    selectedYear === 2024 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Avis 2024
                </button>
                <button
                  onClick={() => setSelectedYear(2025)}
                  className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                    selectedYear === 2025 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Avis 2025
                </button>
                <button
                  onClick={() => setSelectedYear(2026)}
                  className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                    selectedYear === 2026 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Avis 2026
                </button>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mb-6">
              {selectedYear === 2024 && "Revenus 2023 • Barème 2024"}
              {selectedYear === 2025 && "Revenus 2024 • Barème 2025"}
              {selectedYear === 2026 && "Revenus 2025 • Barème 2026 (projection)"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Formulaire */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Revenus
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salaire net annuel (€)
                    </label>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Ex: 42000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prélèvement à la source annuel actuel (€)
                    </label>
                    <input
                      type="number"
                      value={currentTax}
                      onChange={(e) => setCurrentTax(e.target.value)}
                      placeholder="Ex: 3200 (optionnel)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Revenus fonciers nets (€)
                    </label>
                    <input
                      type="number"
                      value={rentalIncome}
                      onChange={(e) => setRentalIncome(e.target.value)}
                      placeholder="Ex: 12000 (optionnel)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Situation familiale
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={familySituation}
                      onChange={(e) => setFamilySituation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="single">Célibataire</option>
                      <option value="married">Marié(e) ou pacsé(e)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre d'enfants à charge
                    </label>
                    <input
                      type="number"
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                      min="0"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Déductions professionnelles
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deduction"
                          value="standard10"
                          checked={deductionType === 'standard10'}
                          onChange={(e) => setDeductionType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">Déduction forfaitaire 10% (min. {deductionLimits.min}€, max. {deductionLimits.max.toLocaleString()}€)</span>
                      </label>
                      
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="deduction"
                          value="realCosts"
                          checked={deductionType === 'realCosts'}
                          onChange={(e) => setDeductionType(e.target.value)}
                          className="mr-2 mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="text-sm">Frais réels</span>
                          {deductionType === 'realCosts' && (
                            <input
                              type="number"
                              value={realCosts}
                              onChange={(e) => setRealCosts(e.target.value)}
                              placeholder="Montant des frais réels"
                              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="space-y-6">
              {/* Pub avant résultats - responsive */}
              <div className="flex justify-center lg:hidden">
                {/* Pub mobile uniquement visible sur mobile */}
                <div className="w-[300px] h-[250px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                  Publicité (300x250)
                </div>
              </div>

              {calculateTax && (
                <>
                  <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Estimation pour avis {selectedYear}
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center bg-white p-4 rounded">
                          <div className="text-xl md:text-2xl font-bold text-blue-600">
                            {calculateTax.totalTax.toLocaleString()}€
                          </div>
                          <div className="text-sm text-gray-600">Impôt annuel final</div>
                        </div>
                        
                        <div className="text-center bg-white p-4 rounded">
                          <div className="text-xl md:text-2xl font-bold text-blue-600">
                            {calculateTax.monthlyTax.toLocaleString()}€
                          </div>
                          <div className="text-sm text-gray-600">Par mois</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 space-y-1">
                        <div>Base imposable : <strong>{calculateTax.taxableIncome.toLocaleString()}€</strong></div>
                        <div>Parts fiscales : <strong>{calculateTax.familyShares}</strong></div>
                        <div>Impôt avant décote : <strong>{calculateTax.totalTaxBeforeDecote.toLocaleString()}€</strong></div>
                        {calculateTax.decote > 0 && (
                          <div className="text-green-600">Décote appliquée : <strong>-{calculateTax.decote.toLocaleString()}€</strong></div>
                        )}
                        <div>Taux effectif : <strong>{calculateTax.effectiveRate}%</strong></div>
                        <div>Déduction professionnelle : <strong>{calculateTax.deductionAmount.toLocaleString()}€</strong></div>
                      </div>
                    </div>
                  </div>

                  {calculateTax.currentWithholding > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-800 mb-2">
                        Comparaison avec votre prélèvement actuel
                      </h3>
                      <div className="text-sm text-yellow-700">
                        <div>Prélèvement actuel : {calculateTax.currentWithholding.toLocaleString()}€/an</div>
                        <div className={`font-medium ${calculateTax.difference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          Différence : {calculateTax.difference > 0 ? '+' : ''}{calculateTax.difference.toLocaleString()}€
                          {calculateTax.difference > 0 ? ' (complément possible)' : ' (remboursement possible)'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pub desktop dans la colonne résultats */}
                  <div className="hidden lg:flex justify-center">
                    <div className="w-[336px] h-[280px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                      Publicité (336x280)
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg text-xs text-gray-600">
                    Cette estimation est indicative et basée sur les barèmes fiscaux officiels. 
                    Elle ne remplace pas un calcul officiel.
                    <br /><br />
                    <strong>⚠️ Non pris en compte :</strong> revenus étrangers soumis au taux effectif, 
                    réductions d'impôt spécifiques, crédits d'impôt, situations particulières.
                  </div>

                  {/* Liens utiles */}
                  <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-lg">
                    <h3 className="text-md font-semibold mb-4 text-gray-900">Outils officiels complémentaires</h3>
                    <div className="space-y-3">
                      <div>
                        <a 
                          href="https://www.impots.gouv.fr/simulateurs" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          🏛️ Simulateurs officiels impots.gouv.fr
                        </a>
                        <p className="text-xs text-gray-500 mt-1">Calculs officiels avec toutes les spécificités</p>
                      </div>
                      
                      <div>
                        <a 
                          href="https://mon-entreprise.urssaf.fr/simulateurs-et-assistants" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          💼 Simulateurs Urssaf (salaire, cotisations)
                        </a>
                        <p className="text-xs text-gray-500 mt-1">Calculs net/brut, charges sociales</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!calculateTax && (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Calculator className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    Saisissez votre salaire net annuel pour voir l'estimation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer avec mentions légales */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Calculateur d'impôt • Estimation indicative • 
            <button 
              onClick={() => setCurrentView('about')} 
              className="hover:text-gray-700 ml-1 underline"
            >
              À propos
            </button> • 
            <button 
              onClick={() => setCurrentView('mentions')} 
              className="hover:text-gray-700 ml-1 underline"
            >
              Mentions légales
            </button> • 
            <button 
              onClick={() => setCurrentView('privacy')} 
              className="hover:text-gray-700 ml-1 underline"
            >
              Confidentialité
            </button>
          </p>
        </div>
      </footer>
<Analytics />
    </div>
  );
};

export default TaxEstimator;
