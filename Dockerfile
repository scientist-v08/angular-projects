FROM nginx:alpine

COPY dist/apps/app-35-astrology/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]