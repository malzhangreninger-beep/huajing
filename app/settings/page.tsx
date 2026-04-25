import { Sidebar } from "@/components/sidebar";
import { Settings, User, Palette, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
            <div className="flex items-center gap-3 px-6 py-4 lg:px-8">
              <div className="p-2 rounded-lg bg-secondary border border-border">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">设置</h1>
                <p className="text-sm text-muted-foreground">管理你的账户和偏好</p>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Profile Section */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">个人资料</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      艺术家名称
                    </label>
                    <input
                      type="text"
                      placeholder="你的名字或笔名"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      创作领域
                    </label>
                    <input
                      type="text"
                      placeholder="例如：油画、水彩、数字艺术..."
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      个人简介
                    </label>
                    <textarea
                      placeholder="简单介绍一下你的艺术追求..."
                      rows={3}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Preferences Section */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">偏好设置</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">AI 回应风格</p>
                      <p className="text-sm text-muted-foreground">
                        选择 AI 顾问的交流方式
                      </p>
                    </div>
                    <select className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>专业学术</option>
                      <option>温暖亲切</option>
                      <option>简洁直接</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">美术史参考偏好</p>
                      <p className="text-sm text-muted-foreground">
                        选择参考作品的时期范围
                      </p>
                    </div>
                    <select className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>全部时期</option>
                      <option>古典主义</option>
                      <option>现代艺术</option>
                      <option>当代艺术</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">每日记录提醒</p>
                      <p className="text-sm text-muted-foreground">
                        提醒你记录创作灵感
                      </p>
                    </div>
                    <button className="relative w-12 h-6 bg-primary rounded-full transition-colors">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Data Section */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">数据与隐私</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">导出日志数据</p>
                      <p className="text-sm text-muted-foreground">
                        下载你所有的创作日志
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground hover:bg-secondary/80 transition-colors">
                      导出
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-destructive">清除所有数据</p>
                      <p className="text-sm text-muted-foreground">
                        删除你的所有日志和分析记录
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive hover:bg-destructive/20 transition-colors">
                      清除
                    </button>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="text-center py-8 text-muted-foreground">
                <p className="text-sm mb-2">画境 v0.1.0</p>
                <p className="text-xs">为艺术创作者而生的 AI 创作伴侣</p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
