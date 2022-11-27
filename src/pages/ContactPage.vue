<!-- eslint-disable no-irregular-whitespace -->
<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Контакты</h1>
    </header>
    <div class="row">
      <div class="contact-content">
        <h2>Адрес</h2>
        <p>
          664074, г. Иркутск, ул. Лермонтова, 83 <br />
          ИРНИТУ
        </p>
        <div class="contact-content-block">
          <h3>Режим работы</h3>
          <p>
            Пн-Пт с 9:00 до 16:00 <br />
            Перерыв с 12:30 до 13:00
          </p>
        </div>
      </div>
      <div class="contact-content">
        <h2>Телефон</h2>
        <a class="link" href="tel:+73952405164">+7 (3952) 40-51-64</a>
        <div class="contact-content-block">
          <h3>Справочная</h3>
          <a class="link" href="tel:+73952405009">+7 (3952) 405-009</a>
        </div>
        <div class="contact-content-block">
          <h3>Факс</h3>
          <a class="link" href="tel:+73952405100">+7 (3952) 405-100</a>
        </div>
      </div>
      <div class="contact-content">
        <h2>Персоналии</h2>
        <div class="contact-content-block">
          <h3>Отдел Проектной деятельности</h3>
          <a
            class="link"
            href="https://www.istu.edu/ob_irnitu/person/chimitov_pavel_evgenevich"
            target="_blank"
          >
            Чимитов Павел Евгеньевич
          </a>
        </div>
        <div class="contact-content-block">
          <h3>Администратор сайта</h3>
          <a
            class="link"
            href="https://www.istu.edu/ob_irnitu/person/arshinskiy_vadim_leonidovich"
            target="_blank"
          >
            Аршинский Вадим Леонидович
          </a>
        </div>
      </div>
    </div>
    <iframe
      ref="mapRef"
      class="map"
      sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
      width="100%"
      height="600px"
      frameborder="0"
    ></iframe>
    <ContactForm />
  </PageLayout>
</template>

<script setup lang="ts">
  import PageLayout from '@/components/layout/PageLayout.vue';
  import ContactForm from '@/components/layout/contact/ContactForm.vue';
  import { onMounted, ref } from 'vue';

  const mapRef = ref<HTMLIFrameElement | null>(null);

  onMounted(() => {
    openMap(
      'PGJvZHk+PHN0eWxlPgogICAgICAgIGh0bWwsIGJvZHkgewogICAgICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgfQogICAgICAgIGh0bWwsIGJvZHksICNtYXAgewogICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgIH0KICAgICAgICAuYnVsbGV0LW1hcmtlciB7CiAgICAgICAgICAgIHdpZHRoOiAyMHB4OwogICAgICAgICAgICBoZWlnaHQ6IDIwcHg7CiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7CiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTsKICAgICAgICAgICAgYm9yZGVyOiA0cHggc29saWQgIzAyODFmMjsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlOwogICAgICAgIH0KICAgICAgICAucGVybWFuZW50LXRvb2x0aXAgewogICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lOwogICAgICAgICAgICBib3gtc2hhZG93OiBub25lOwogICAgICAgICAgICBib3JkZXI6IG5vbmU7CiAgICAgICAgICAgIHBhZGRpbmc6IDZweCAxMnB4OwogICAgICAgICAgICBjb2xvcjogIzI2MjYyNjsKICAgICAgICB9CiAgICAgICAgLnBlcm1hbmVudC10b29sdGlwOmJlZm9yZSB7CiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7CiAgICAgICAgfQogICAgICAgIC5kZy1wb3B1cF9oaWRkZW5fdHJ1ZSB7CiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrOwogICAgICAgIH0KICAgICAgICAubGVhZmxldC1jb250YWluZXIgLmxlYWZsZXQtcG9wdXAgLmxlYWZsZXQtcG9wdXAtY2xvc2UtYnV0dG9uIHsKICAgICAgICAgICAgdG9wOiAwOwogICAgICAgICAgICByaWdodDogMDsKICAgICAgICAgICAgd2lkdGg6IDIwcHg7CiAgICAgICAgICAgIGhlaWdodDogMjBweDsKICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4OwogICAgICAgICAgICBsaW5lLWhlaWdodDogMTsKICAgICAgICB9CiAgICA8L3N0eWxlPjxkaXYgaWQ9Im1hcCI+PC9kaXY+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iaHR0cHM6Ly9tYXBzLmFwaS4yZ2lzLnJ1LzIuMC9sb2FkZXIuanM/cGtnPWZ1bGwmYW1wO3NraW49bGlnaHQiPjwvc2NyaXB0PjxzY3JpcHQ+KGZ1bmN0aW9uKGUpe3ZhciB0PUpTT04ucGFyc2UoZSkscj10Lm9yZGVyZWRHZW9tZXRyaWVzLG49dC5tYXBQb3NpdGlvbixhPXQuaXNXaGVlbFpvb21FbmFibGVkO2Z1bmN0aW9uIG8oZSl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKGUpLnNwbGl0KCIiKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIiUiKygiMDAiK2UuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKX0pLmpvaW4oIiIpKX1ERy50aGVuKGZ1bmN0aW9uKCl7dmFyIGU9REcubWFwKCJtYXAiLHtjZW50ZXI6W24ubGF0LG4ubG9uXSx6b29tOm4uem9vbSxzY3JvbGxXaGVlbFpvb206YSx6b29tQ29udHJvbDohYX0pO0RHLmdlb0pTT04ocix7c3R5bGU6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGEsbztyZXR1cm57ZmlsbENvbG9yOm51bGw9PT0odD1lKXx8dm9pZCAwPT09dD92b2lkIDA6dC5wcm9wZXJ0aWVzLmZpbGxDb2xvcixmaWxsT3BhY2l0eTpudWxsPT09KHI9ZSl8fHZvaWQgMD09PXI/dm9pZCAwOnIucHJvcGVydGllcy5maWxsT3BhY2l0eSxjb2xvcjpudWxsPT09KG49ZSl8fHZvaWQgMD09PW4/dm9pZCAwOm4ucHJvcGVydGllcy5zdHJva2VDb2xvcix3ZWlnaHQ6bnVsbD09PShhPWUpfHx2b2lkIDA9PT1hP3ZvaWQgMDphLnByb3BlcnRpZXMuc3Ryb2tlV2lkdGgsb3BhY2l0eTpudWxsPT09KG89ZSl8fHZvaWQgMD09PW8/dm9pZCAwOm8ucHJvcGVydGllcy5zdHJva2VPcGFjaXR5fX0scG9pbnRUb0xheWVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuInJhZGl1cyJpbiBlLnByb3BlcnRpZXM/REcuY2lyY2xlKHQsZS5wcm9wZXJ0aWVzLnJhZGl1cyk6REcubWFya2VyKHQse2ljb246ZnVuY3Rpb24oZSl7cmV0dXJuIERHLmRpdkljb24oe2h0bWw6IjxkaXYgY2xhc3M9J2J1bGxldC1tYXJrZXInIHN0eWxlPSdib3JkZXItY29sb3I6ICIrZSsiOyc+PC9kaXY+IixjbGFzc05hbWU6Im92ZXJyaWRlLWRlZmF1bHQiLGljb25TaXplOlsyMCwyMF0saWNvbkFuY2hvcjpbMTAsMTBdfSl9KGUucHJvcGVydGllcy5jb2xvcil9KX0sb25FYWNoRmVhdHVyZTpmdW5jdGlvbihlLHQpe2UucHJvcGVydGllcy5kZXNjcmlwdGlvbiYmdC5iaW5kUG9wdXAobyhlLnByb3BlcnRpZXMuZGVzY3JpcHRpb24pLHtjbG9zZUJ1dHRvbjohMCxjbG9zZU9uRXNjYXBlS2V5OiEwfSksZS5wcm9wZXJ0aWVzLnRpdGxlJiZ0LmJpbmRUb29sdGlwKG8oZS5wcm9wZXJ0aWVzLnRpdGxlKSx7cGVybWFuZW50OiEwLG9wYWNpdHk6MSxjbGFzc05hbWU6InBlcm1hbmVudC10b29sdGlwIn0pfX0pLmFkZFRvKGUpfSl9KSgneyJvcmRlcmVkR2VvbWV0cmllcyI6W3sidHlwZSI6IkZlYXR1cmUiLCJwcm9wZXJ0aWVzIjp7InRpdGxlIjoiMEpqUmdOQ2QwSmpRb3RDaiIsImRlc2NyaXB0aW9uIjoiIiwiY29sb3IiOiIjMDI4MWYyIiwiekluZGV4IjoxMDAwMDAwMDAwfSwiZ2VvbWV0cnkiOnsidHlwZSI6IlBvaW50IiwiY29vcmRpbmF0ZXMiOlsxMDQuMjYyMDU2LDUyLjI2MjcxNF19LCJpZCI6MTYxNX1dLCJtYXBQb3NpdGlvbiI6eyJsYXQiOjUyLjI2MjQzMTcyMjI4NzkzNiwibG9uIjoxMDQuMjYzNTE1NDcyNDEyMTEsInpvb20iOjE2fSwiaXNXaGVlbFpvb21FbmFibGVkIjpmYWxzZX0nKTwvc2NyaXB0PjxzY3JpcHQgYXN5bmM9IiIgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9VUEtMTU4ODY2MTY4LTEiPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4oZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCgpe2RhdGFMYXllci5wdXNoKGFyZ3VtZW50cyl9d2luZG93LmRhdGFMYXllcj13aW5kb3cuZGF0YUxheWVyfHxbXSx0KCJqcyIsbmV3IERhdGUpLHQoImNvbmZpZyIsZSksd2luZG93Lmd0YWc9dH0pKCdVQS0xNTg4NjYxNjgtMScpPC9zY3JpcHQ+PC9ib2R5Pg==',
    );
  });

  function openMap(t: string) {
    if (mapRef.value && mapRef.value.contentWindow) {
      mapRef.value.contentWindow.document.open();
      mapRef.value.contentWindow.document.write(atob(t));
      mapRef.value.contentWindow.document.close();
    }
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .header {
    margin-top: 4.75rem;
    margin-bottom: 6.7325rem;

    @media (max-width: $mobile-s) {
      margin-top: 30px;
      margin-bottom: 36px;
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 2.75rem;

    & > * {
      flex: 1 12.5rem;
    }
  }

  .contact-content {
    width: 100%;
  }

  .contact-content h2 {
    margin-bottom: 1.7525rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.9375rem;
    color: var(--gray-color-2);

    @media (max-width: $mobile-s) {
      margin-bottom: 7px;
      font-size: 16px;
    }
  }

  .contact-content p {
    margin-bottom: 1.0531rem;
    font-size: 1.25rem;
    font-weight: normal;
    line-height: 1.625rem;
    color: var(--text-color);

    @media (max-width: $mobile-s) {
      font-size: 16px;
    }
  }

  .link {
    display: block;
    margin-bottom: 1.0531rem;
    font-size: 1.25rem;
    font-weight: normal;
    line-height: 1.625rem;
    color: var(--text-color);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  .contact-content-block {
    display: inline-block;
    margin-right: 1.9375rem;
  }

  .contact-content-block h3 {
    margin-bottom: 8px;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.625rem;
    color: var(--text-color);
  }

  .contact-content-block p {
    margin: 0;
  }

  .map {
    width: 100%;
    height: 60vh;
    min-height: 12.5rem;
    margin-top: 3.125rem;
    background-color: var(--gray-color-1);
    border: none;
    border-radius: 0.625rem;
  }
</style>
