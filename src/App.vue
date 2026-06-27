<script setup>
import Layout from './layout/Layout.vue';
import HeroSection from './components/sections/HeroSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import ExperienceSection from './components/sections/ExperienceSection.vue';
import ProjectsSection from './components/sections/ProjectsSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
</script>

<template>
  <Layout>
    <HeroSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <AboutSection />
  </Layout>
</template>