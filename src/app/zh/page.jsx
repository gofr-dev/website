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
  h1: '一个有主见的 Go 微服务框架',
  h2: '为加速微服务开发而生',
  getStarted: '开始使用',
  viewOnGithub: '在 GitHub 查看',
  evaluateLead: '想在你的团队评估并采用 GoFr？',
  evaluateCta: '预约通话。',
}

export default function HomeZh() {
  return (
    <div className="m-auto w-auto max-w-screen-2xl">
      <Hero t={t} />
      {/* Sets visitor expectation: localized landing; detailed reference */}
      {/* docs are still maintained in English. */}
      <div className="flex justify-center px-4 pt-2">
        <p className="rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
          首页内容已翻译为简体中文。详尽的技术文档仍以
          <Link href="/docs" className="text-sky-400 hover:text-sky-300">
            英文
          </Link>
          维护。
        </p>
      </div>
      <CompanyList />
      <div className="not-prose my-12 grid grid-cols-1 gap-6 px-4 md:grid-cols-3 lg:px-8 xl:px-12">
        <QuickLink
          title="经过企业级生产验证"
          description="多年来在不同行业的大规模生产环境中稳定运行，久经考验。"
          icon="presets"
        />
        <QuickLink
          title="开箱即用的可观测性"
          description="无需额外代码即可获得指标、追踪与日志。追踪导出至 OpenTelemetry 兼容后端，指标采用 Prometheus 格式。"
          icon="lightbulb"
        />
        <QuickLink
          title="默认遵循 REST 规范"
          description="状态码、响应格式、错误处理 —— 一切按照 REST 标准自动处理，无需手动配置。"
          icon="plugins"
        />
        <QuickLink
          title="完善的中间件支持"
          description="提供丰富的预置中间件，同时支持灵活集成自定义中间件，满足各类业务需求。"
          icon="middleware"
        />
        <QuickLink
          title="基于环境的配置"
          description="遵循 12-factor 配置原则，简化对 MySQL、Postgres、Kafka、Google Pub/Sub、NATS JetStream 等数据源的集成。"
          icon="env"
        />
        <QuickLink
          title="自动崩溃恢复"
          description="GoFr 自动捕获 panic 并恢复，确保服务持续可用。"
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
