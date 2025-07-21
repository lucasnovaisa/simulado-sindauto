import React from 'react';
import { AlertTriangle, RotateCcw, LogOut, CheckCircle, XCircle } from 'lucide-react';

interface EndModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onExit: () => void;
  answeredQuestions: number;
  totalQuestions: number;
  showResults: boolean;
  score: number;
  isApproved: boolean;
}

export const EndModal: React.FC<EndModalProps> = ({
  isOpen,
  onRestart,
  onExit,
  answeredQuestions,
  totalQuestions,
  showResults,
  score,
  isApproved,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
        {showResults ? (
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isApproved ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isApproved ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${
              isApproved ? 'text-green-600' : 'text-red-600'
            }`}>
              {isApproved ? 'APROVADO' : 'REPROVADO'}
            </h2>
            <p className="text-gray-600 text-lg">
              Sua pontuação: {showResults && (
                <span className="font-medium">{Math.round((score / 100) * answeredQuestions)}</span>
            )}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {isApproved ? 'Parabéns! Você atingiu a nota mínima.' : 'Você precisa de pelo menos 75% para ser aprovado.'}
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Encerrar Simulado</h2>
            <p className="text-gray-600">
              Você tem certeza que deseja encerrar o simulado?
            </p>
          </div>
        )}

        <div className={`rounded-lg p-4 mb-6 ${
          showResults 
            ? isApproved 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            : 'bg-gray-50'
        }`}>
          <h3 className="font-semibold text-gray-800 mb-2">
            {showResults ? 'Resultado Final:' : 'Progresso atual:'}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Questões respondidas:</span>
              <span className="font-medium">{answeredQuestions} de {totalQuestions}</span>
            </div>
            {showResults && (
              <div className="flex justify-between">
                <span>Questões corretas:</span>
                <span className="font-medium">{Math.round((score / 100) * answeredQuestions)} de {answeredQuestions}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{showResults ? 'Aproveitamento:' : 'Progresso:'}</span>
              <span className="font-medium">
                {showResults ? `${score.toFixed(1)}%` : `${Math.round((answeredQuestions / totalQuestions) * 100)}%`}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-3 px-6 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{showResults ? 'Fazer Novo Simulado' : 'Reiniciar Simulado'}</span>
          </button>
          
          <button
            onClick={onExit}
            className="w-full py-3 px-6 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>{showResults ? 'Voltar ao Início' : 'Sair do Simulado'}</span>
          </button>
        </div>

        {!showResults && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs text-center">
              ⚠️ Ao sair, todo o progresso será perdido
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
