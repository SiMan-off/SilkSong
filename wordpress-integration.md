# WordPress интеграция для Silksong.ru

## Инструкция по переносу на WordPress

### 1. Подготовка WordPress

```bash
# Создание базы данных
CREATE DATABASE silksong_ru;
CREATE USER 'silksong_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON silksong_ru.* TO 'silksong_user'@'localhost';
FLUSH PRIVILEGES;

# Скачивание WordPress
wget https://wordpress.org/latest.zip
unzip latest.zip
```

### 2. Конфигурация темы

Создайте папку `silksong-theme` в `/wp-content/themes/`:

#### functions.php
```php
<?php
// Подключение стилей и скриптов
function silksong_theme_setup() {
    wp_enqueue_style('silksong-style', get_stylesheet_uri());
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Roboto:wght@300;400;500;700&display=swap');
    wp_enqueue_script('silksong-script', get_template_directory_uri() . '/script.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'silksong_theme_setup');

// Поддержка меню
function silksong_menus() {
    register_nav_menus(array(
        'primary' => 'Основное меню',
        'footer' => 'Меню в футере'
    ));
}
add_action('init', 'silksong_menus');

// Поддержка изображений
add_theme_support('post-thumbnails');
add_theme_support('title-tag');

// Сайдбары для рекламы
function silksong_widgets_init() {
    register_sidebar(array(
        'name' => 'Горизонтальная реклама',
        'id' => 'horizontal-ads',
        'before_widget' => '<div class="ad-container ad-horizontal">',
        'after_widget' => '</div>',
    ));

    register_sidebar(array(
        'name' => 'Вертикальная реклама',
        'id' => 'vertical-ads',
        'before_widget' => '<div class="ad-container ad-vertical">',
        'after_widget' => '</div>',
    ));
}
add_action('widgets_init', 'silksong_widgets_init');

// SEO функции
function silksong_seo_meta() {
    if (is_single()) {
        global $post;
        $excerpt = wp_trim_words($post->post_content, 30);
        echo '<meta name="description" content="' . esc_attr($excerpt) . '">';
    }
}
add_action('wp_head', 'silksong_seo_meta');
?>
```

#### index.php
```php
<?php get_header(); ?>

<section id="home" class="hero">
    <div class="hero-background"></div>
    <div class="hero-content">
        <h1 class="hero-title"><?php bloginfo('name'); ?></h1>
        <p class="hero-subtitle"><?php bloginfo('description'); ?></p>
        <div class="hero-buttons">
            <a href="#news" class="btn btn-primary">Последние новости</a>
            <a href="#game" class="btn btn-secondary">Об игре</a>
        </div>
    </div>
</section>

<!-- Реклама -->
<?php if (is_active_sidebar('horizontal-ads')) : ?>
    <?php dynamic_sidebar('horizontal-ads'); ?>
<?php endif; ?>

<section id="news" class="news">
    <div class="container">
        <h2 class="section-title">Последние новости</h2>
        <div class="news-grid">
            <?php
            $news_posts = new WP_Query(array(
                'posts_per_page' => 3,
                'category_name' => 'news'
            ));

            if ($news_posts->have_posts()) :
                while ($news_posts->have_posts()) : $news_posts->the_post();
            ?>
                <article class="news-card">
                    <div class="news-image">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail(); ?>
                        <?php endif; ?>
                        <span class="news-date"><?php echo get_the_date(); ?></span>
                    </div>
                    <div class="news-content">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                        <a href="<?php the_permalink(); ?>" class="read-more">Читать далее →</a>
                    </div>
                </article>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
```

#### header.php
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <meta name="description" content="<?php echo get_bloginfo('description'); ?>">
    <meta name="keywords" content="Hollow Knight Silksong, Хорнет, Silksong дата выхода">

    <!-- Yandex.Metrika -->
    <script type="text/javascript">
       (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
       m[i].l=1*new Date();
       for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
       k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
       (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

       ym(<?php echo get_option('yandex_metrika_id', '12345678'); ?>, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
       });
    </script>

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<nav class="navbar">
    <div class="container">
        <div class="nav-wrapper">
            <a href="<?php echo home_url(); ?>" class="logo">
                <span class="logo-text">SILKSONG</span>
                <span class="logo-subtitle">.RU</span>
            </a>

            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'nav-menu',
                'fallback_cb' => false
            ));
            ?>

            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</nav>
```

### 3. Плагины для SEO и рекламы

#### Необходимые плагины:
1. **Yoast SEO** - для SEO оптимизации
2. **Advanced Ads** - для управления рекламой
3. **WP Super Cache** - для кеширования
4. **Akismet** - защита от спама

#### Настройка рекламных блоков

Создайте виджет для Яндекс.Рекламы:

```php
// В functions.php
class Yandex_Ads_Widget extends WP_Widget {
    function __construct() {
        parent::__construct(
            'yandex_ads_widget',
            'Яндекс.Реклама',
            array('description' => 'Блок Яндекс.Рекламы')
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];
        ?>
        <div class="yandex-ad" id="yandex_rtb_<?php echo esc_attr($instance['block_id']); ?>">
            <script>
                window.yaContextCb = window.yaContextCb || [];
                window.yaContextCb.push(()=>{
                    Ya.Context.AdvManager.render({
                        blockId: "<?php echo esc_js($instance['block_id']); ?>",
                        renderTo: "yandex_rtb_<?php echo esc_js($instance['block_id']); ?>"
                    });
                });
            </script>
        </div>
        <?php
        echo $args['after_widget'];
    }

    public function form($instance) {
        $block_id = !empty($instance['block_id']) ? $instance['block_id'] : '';
        ?>
        <p>
        <label for="<?php echo $this->get_field_id('block_id'); ?>">ID блока:</label>
        <input class="widefat" id="<?php echo $this->get_field_id('block_id'); ?>"
               name="<?php echo $this->get_field_name('block_id'); ?>" type="text"
               value="<?php echo esc_attr($block_id); ?>">
        </p>
        <?php
    }
}

// Регистрация виджета
add_action('widgets_init', function() {
    register_widget('Yandex_Ads_Widget');
});
```

### 4. Настройка админки

#### Добавление кастомных полей для SEO:

```php
// Добавление метабоксов для SEO
function silksong_add_meta_boxes() {
    add_meta_box(
        'silksong-seo',
        'SEO настройки',
        'silksong_seo_meta_box',
        'post'
    );
}
add_action('add_meta_boxes', 'silksong_add_meta_boxes');

function silksong_seo_meta_box($post) {
    wp_nonce_field('silksong_seo_meta_box', 'silksong_seo_meta_box_nonce');

    $seo_title = get_post_meta($post->ID, '_seo_title', true);
    $seo_description = get_post_meta($post->ID, '_seo_description', true);
    $seo_keywords = get_post_meta($post->ID, '_seo_keywords', true);

    echo '<table style="width: 100%;">';
    echo '<tr><td style="width: 150px;"><label for="seo_title">SEO заголовок:</label></td>';
    echo '<td><input type="text" id="seo_title" name="seo_title" value="' . esc_attr($seo_title) . '" style="width: 100%;" /></td></tr>';

    echo '<tr><td><label for="seo_description">SEO описание:</label></td>';
    echo '<td><textarea id="seo_description" name="seo_description" style="width: 100%; height: 100px;">' . esc_textarea($seo_description) . '</textarea></td></tr>';

    echo '<tr><td><label for="seo_keywords">Ключевые слова:</label></td>';
    echo '<td><input type="text" id="seo_keywords" name="seo_keywords" value="' . esc_attr($seo_keywords) . '" style="width: 100%;" /></td></tr>';
    echo '</table>';
}

// Сохранение метаданных
function silksong_save_meta_box($post_id) {
    if (!isset($_POST['silksong_seo_meta_box_nonce'])) return;
    if (!wp_verify_nonce($_POST['silksong_seo_meta_box_nonce'], 'silksong_seo_meta_box')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    if (isset($_POST['seo_title'])) {
        update_post_meta($post_id, '_seo_title', sanitize_text_field($_POST['seo_title']));
    }

    if (isset($_POST['seo_description'])) {
        update_post_meta($post_id, '_seo_description', sanitize_textarea_field($_POST['seo_description']));
    }

    if (isset($_POST['seo_keywords'])) {
        update_post_meta($post_id, '_seo_keywords', sanitize_text_field($_POST['seo_keywords']));
    }
}
add_action('save_post', 'silksong_save_meta_box');
```

### 5. Миграция контента

1. Создайте страницы для каждой секции
2. Импортируйте CSS и JS файлы в тему
3. Настройте виджеты для рекламных блоков
4. Настройте меню навигации
5. Создайте категории для новостей

### 6. Оптимизация

```php
// Оптимизация загрузки
function silksong_optimize_scripts() {
    // Удаление ненужных скриптов
    wp_deregister_script('wp-embed');

    // Отложенная загрузка JS
    add_filter('script_loader_tag', function($tag, $handle) {
        if (is_admin()) return $tag;

        $defer_scripts = array('silksong-script');
        if (in_array($handle, $defer_scripts)) {
            return str_replace(' src', ' defer src', $tag);
        }
        return $tag;
    }, 10, 2);
}
add_action('wp_enqueue_scripts', 'silksong_optimize_scripts');

// Сжатие HTML
function silksong_compress_html() {
    ob_start(function($buffer) {
        return preg_replace('/\s+/', ' ', $buffer);
    });
}
add_action('wp_loaded', 'silksong_compress_html');
```

Этот WordPress сайт будет полностью функциональным с возможностью управления контентом через админку!