'use client'
import CompanyList from '@/components/CompanyTrustedList'
import DBlistComponent from '@/components/DBlistComponent'
import { Hero } from '@/components/Hero'
import { QuickLink } from '@/components/QuickLinks'
import blurCyanImage from '@/images/blur-cyan.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Testimonials from '@/components/Reviews'

const t = {
  h1: 'Un framework de Go con opiniones',
  h2: 'Para el desarrollo acelerado de microservicios',
  getStarted: 'Comenzar',
  viewOnGithub: 'Ver en GitHub',
  evaluateLead: '¿Quieres evaluar y adoptar GoFr en tu organización?',
  evaluateCta: 'reserva una llamada.',
}

export default function HomeEs() {
  return (
    <div className="m-auto w-auto max-w-screen-2xl">
      <Hero t={t} />
      {/* Sets visitor expectation: this is a localized landing; the */}
      {/* detailed reference docs are still maintained in English. */}
      <div className="flex justify-center px-4 pt-2">
        <p className="rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
          La página principal está en español. La documentación técnica detallada se mantiene en{' '}
          <Link href="/docs" className="text-sky-400 hover:text-sky-300">
            inglés
          </Link>
          .
        </p>
      </div>
      <CompanyList />
      <div className="not-prose my-12 grid grid-cols-1 gap-6 px-4 md:grid-cols-3 lg:px-8 xl:px-12">
        <QuickLink
          title="Probado a escala empresarial"
          description="Construido tras años ejecutando cargas de trabajo en producción a gran escala en diversas industrias."
          icon="presets"
        />
        <QuickLink
          title="Observabilidad incluida"
          description="Métricas, trazas y logs sin escribir una sola línea. Trazas hacia proveedores compatibles con OpenTelemetry, métricas en formato Prometheus."
          icon="lightbulb"
        />
        <QuickLink
          title="Estándares REST por defecto"
          description="El comportamiento por defecto es como tú diseñarías una API REST. Códigos de estado y formatos de respuesta — todo gestionado automáticamente por GoFr."
          icon="plugins"
        />
        <QuickLink
          title="Soporte de middleware"
          description="Eleva la productividad con middleware predefinido, manteniendo la flexibilidad de integrar middleware propio cuando lo necesites."
          icon="middleware"
        />
        <QuickLink
          title="Configuración por entorno"
          description="Sigue los principios de 12-factor para la configuración de aplicaciones, simplificando la integración con MySQL, Postgres, Kafka, Google Pub/Sub, NATS JetStream y otros."
          icon="env"
        />
        <QuickLink
          title="Manejo de errores y recuperación"
          description="GoFr captura panics y se recupera automáticamente para mantener la disponibilidad continua de tu servidor."
          icon="crash"
        />
        <Image
          className="absolute mt-80 opacity-25"
          src={blurCyanImage}
          alt=""
          aria-hidden="true"
          width={'h-44'}
          unoptimized
          priority
        />
      </div>

      <DBlistComponent />
      <Testimonials />
    </div>
  )
}
