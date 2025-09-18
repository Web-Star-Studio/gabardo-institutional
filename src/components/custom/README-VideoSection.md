# VideoSection Component

Componente para embedding de vídeos do Vimeo seguindo as [melhores práticas do Next.js](https://nextjs.org/docs/app/guides/videos).

## 🚀 Uso

```tsx
import VideoSection from '@/components/custom/VideoSection';

export default function Page() {
  return (
    <VideoSection 
      vimeoId="SEU_VIDEO_ID_AQUI"
      title="Título do Vídeo"
      description="Descrição do vídeo"
    />
  );
}
```

## 📋 Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `vimeoId` | `string` | `"123456789"` | ID do vídeo no Vimeo |
| `title` | `string` | `"Conheça o Hub Plural"` | Título da seção |
| `description` | `string` | `"Descubra como..."` | Descrição da seção |

## 🎬 Como obter o ID do Vimeo

1. Acesse seu vídeo no Vimeo
2. A URL será algo como: `https://vimeo.com/123456789`
3. O ID é a sequência numérica: `123456789`

## ✨ Funcionalidades

- **Lazy Loading**: Carregamento otimizado do iframe
- **React Suspense**: Loading state elegante com skeleton
- **Responsive**: Adapta-se a diferentes tamanhos de tela
- **Accessibility**: Suporte completo à acessibilidade
- **Performance**: Configurações otimizadas do player Vimeo

## 🎛️ Configurações do Player

O componente inclui configurações otimizadas:

- `autoplay: '0'` - Não inicia automaticamente
- `dnt: '1'` - Do Not Track para privacidade
- `quality: 'auto'` - Qualidade automática baseada na conexão
- `pip: '1'` - Suporte a Picture-in-Picture
- `keyboard: '1'` - Controles via teclado
- `fullscreen: '1'` - Modo tela cheia

## 🎨 Customização

O componente inclui elementos visuais:

- Skeleton de carregamento animado
- Elementos decorativos nos cantos
- Gradiente de fundo sutil
- Cards informativos abaixo do vídeo
- Call-to-action integrado

## 📱 Responsividade

- **Mobile**: 400px de altura
- **Tablet**: 500px de altura  
- **Desktop**: 600px de altura

## ⚡ Performance

- **Loading lazy**: Iframe carrega apenas quando necessário
- **Transition suave**: Opacity animation durante carregamento
- **Otimizado**: Parâmetros do Vimeo otimizados para web

## 🔧 Exemplo de Uso Real

```tsx
// Na página sobre
<VideoSection 
  vimeoId="987654321"
  title="Nossa História em Vídeo"
  description="Conheça a trajetória do Hub Plural e nossa visão para o futuro do trabalho"
/>

// Em uma landing page
<VideoSection 
  vimeoId="456789123"
  title="Tour Virtual"
  description="Faça um tour pelos nossos espaços sem sair de casa"
/>
```

## 🚨 Nota Importante

Lembre-se de substituir o `vimeoId` padrão (`"123456789"`) pelo ID real do seu vídeo do Vimeo!

---

**Desenvolvido seguindo as diretrizes do Next.js 15 para integração de vídeos externos.** 