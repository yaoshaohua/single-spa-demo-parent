<template>
  <a-layout id="basic-layout">
    <a-layout-sider>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['/']">
        <a-menu-item key="/">
          <router-link to="/">
            <a-icon type="user" />
            <span>Home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/about">
          <router-link to="/about">
            <a-icon type="video-camera" />
            <span>About</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/childHome">
          <router-link to="/child">
            <a-icon type="video-camera" />
            <span>子应用home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/childAbout">
          <router-link to="/child/about">
            <a-icon type="video-camera" />
            <span>子应用about</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content
        :style="{
          background: '#fff',
          margin: '24px 16px 0',
          overflow: 'initial'
        }"
      >
        <router-view />
        <!-- 子应用加载的位置 -->
        <div id="vue"></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style>
#basic-layout {
  height: 100%;
}
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
