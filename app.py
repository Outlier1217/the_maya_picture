from flask import Flask, render_template, request, jsonify
import psycopg2
from psycopg2 import Error
from psycopg2.extras import DictCursor
import os

app = Flask(__name__)

# PostgreSQL Configuration
def get_db_connection():
    try:
        # Render ka DATABASE_URL ya local config
        DATABASE_URL = os.environ.get('DATABASE_URL')
        if DATABASE_URL:
            # Render ke liye postgres:// ko postgresql:// mein convert karo
            DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://')
            conn = psycopg2.connect(DATABASE_URL)
        else:
            # Local development ke liye
            db_config = {
                'host': 'localhost',
                'user': 'postgres',
                'password': 'root',
                'database': 'maya_picture_db',
                'port': '5432'
            }
            conn = psycopg2.connect(**db_config)
        return conn
    except Error as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

@app.route('/')
def index():
    featured_albums = [
        {'name': 'Wedding', 'cover': 'wedding_cover.jpg', 'slug': 'wedding'},
        {'name': 'Portrait', 'cover': 'portrait_cover.jpg', 'slug': 'portrait'},
        {'name': 'Nature', 'cover': 'nature_cover.jpg', 'slug': 'nature'},
        {'name': 'Urban', 'cover': 'urban_cover.jpg', 'slug': 'urban'}
    ]
    testimonials = [
        {'name': 'Sarah & James', 'text': 'Maya captured our wedding perfectly! The photos are stunning.', 'avatar': 'client1.jpg'},
        {'name': 'Michael', 'text': 'Professional and creative. Highly recommend!', 'avatar': 'client2.jpg'},
        {'name': 'The Johnson Family', 'text': 'Our family portraits are beautiful. Thank you!', 'avatar': 'client3.jpg'}
    ]
    return render_template('index.html', featured_albums=featured_albums, testimonials=testimonials)

@app.route('/albums')
def albums():
    all_albums = [
        {'name': 'Wedding', 'cover': 'wedding_cover.jpg', 'slug': 'wedding', 'count': 45},
        {'name': 'Portrait', 'cover': 'portrait_cover.jpg', 'slug': 'portrait', 'count': 32},
        {'name': 'Nature', 'cover': 'nature_cover.jpg', 'slug': 'nature', 'count': 28},
        {'name': 'Urban', 'cover': 'urban_cover.jpg', 'slug': 'urban', 'count': 36},
        {'name': 'Travel', 'cover': 'travel_cover.jpg', 'slug': 'travel', 'count': 52},
        {'name': 'Fashion', 'cover': 'fashion_cover.jpg', 'slug': 'fashion', 'count': 24},
        {'name': 'Events', 'cover': 'events_cover.jpg', 'slug': 'events', 'count': 41},
        {'name': 'Commercial', 'cover': 'commercial_cover.jpg', 'slug': 'commercial', 'count': 19}
    ]
    return render_template('albums.html', albums=all_albums)

@app.route('/album/<album_slug>')
def album_detail(album_slug):
    album_data = {
        'wedding': {
            'name': 'Wedding Photography',
            'description': 'Beautiful moments from weddings I\'ve had the privilege to capture.',
            'images': [f'wedding_{i}.jpg' for i in range(1, 13)]
        },
        'portrait': {
            'name': 'Portrait Sessions',
            'description': 'Capturing the essence and personality of individuals.',
            'images': [f'portrait_{i}.jpg' for i in range(1, 13)]
        },
        'nature': {
            'name': 'Nature Photography',
            'description': 'Capturing the beauty of the natural world.',
            'images': [f'nature_{i}.jpg' for i in range(1, 13)]
        },
        'urban': {
            'name': 'Urban Photography',
            'description': 'Exploring the vibrancy of city life.',
            'images': [f'urban_{i}.jpg' for i in range(1, 13)]
        },
        'travel': {
            'name': 'Travel Photography',
            'description': 'Moments from journeys around the world.',
            'images': [f'travel_{i}.jpg' for i in range(1, 13)]
        },
        'fashion': {
            'name': 'Fashion Photography',
            'description': 'Stylish and creative fashion shoots.',
            'images': [f'fashion_{i}.jpg' for i in range(1, 13)]
        },
        'events': {
            'name': 'Event Photography',
            'description': 'Memorable moments from various events.',
            'images': [f'events_{i}.jpg' for i in range(1, 13)]
        },
        'commercial': {
            'name': 'Commercial Photography',
            'description': 'Professional shots for businesses and brands.',
            'images': [f'commercial_{i}.jpg' for i in range(1, 13)]
        }
    }
    album = album_data.get(album_slug, {
        'name': 'Album Not Found',
        'description': '',
        'images': []
    })
    return render_template('album_detail.html', album=album)

@app.route('/gallery')
def gallery():
    categories = [
        {'name': 'Pre-Wedding', 'cover': 'pre_wedding_cover.jpg', 'slug': 'pre-wedding'},
        {'name': 'Wedding', 'cover': 'wedding_cover.jpg', 'slug': 'wedding'},
        {'name': 'Portrait', 'cover': 'portrait_cover.jpg', 'slug': 'portrait'},
        {'name': 'Commercial', 'cover': 'commercial_cover.jpg', 'slug': 'commercial'}
    ]
    return render_template('gallery.html', categories=categories)

@app.route('/gallery/<category_slug>')
def gallery_category(category_slug):
    category_data = {
        'pre-wedding': {
            'name': 'Pre-Wedding Shoots',
            'description': 'Romantic and fun pre-wedding sessions for couples.',
            'images': [f'pre_wedding_{i}.jpg' for i in range(1, 13)]
        },
        'wedding': {
            'name': 'Wedding Photography',
            'description': 'Beautiful moments from wedding celebrations.',
            'images': [f'wedding_{i}.jpg' for i in range(1, 13)]
        },
        'portrait': {
            'name': 'Portrait Sessions',
            'description': 'Capturing the essence and personality of individuals.',
            'images': [f'portrait_{i}.jpg' for i in range(1, 13)]
        },
        'commercial': {
            'name': 'Commercial Photography',
            'description': 'Professional shots for businesses and brands.',
            'images': [f'commercial_{i}.jpg' for i in range(1, 13)]
        }
    }
    category = category_data.get(category_slug, {
        'name': 'Category Not Found',
        'description': '',
        'images': []
    })
    return render_template('gallery_category.html', category=category)

@app.route('/about')
def about():
    about_data = {
        'intro': "Hi, I'm Maya - a passionate photographer specializing in wedding, portrait, and commercial photography.",
        'bio': "With over 10 years of experience, I've developed a unique style that blends traditional techniques with modern creativity. My approach focuses on capturing authentic moments and emotions.",
        'services': [
            'Wedding Photography',
            'Portrait Sessions',
            'Commercial Shoots',
            'Event Coverage',
            'Photo Editing'
        ],
        'stats': [
            {'number': '500+', 'label': 'Happy Clients'},
            {'number': '10+', 'label': 'Years Experience'},
            {'number': '50+', 'label': 'Events Covered'}
        ]
    }
    return render_template('about.html', about=about_data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        try:
            name = request.form['name'].strip()
            email = request.form['email'].strip()
            subject = request.form['subject'].strip()
            message = request.form['message'].strip()

            if not name or not email or not subject or not message:
                return jsonify({'error': 'All fields are required'}), 400

            if not '@' in email or not '.' in email:
                return jsonify({'error': 'Invalid email address'}), 400

            conn = get_db_connection()
            if conn is None:
                return jsonify({'error': 'Database connection failed'}), 500

            cursor = conn.cursor()
            query = """
                INSERT INTO contact_messages (name, email, subject, message)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (name, email, subject, message))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'message': 'Thank you for your message! We will get back to you soon.'})

        except Error as e:
            print(f"Database error: {e}")
            return jsonify({'error': 'An error occurred while saving your message'}), 500
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'An unexpected error occurred'}), 500

    return render_template('contact.html')

@app.route('/blogs')
def blogs():
    try:
        conn = get_db_connection()
        if conn is None:
            posts = [
                {
                    'id': 1,
                    'title': 'Tips for Great Wedding Photos',
                    'excerpt': 'Learn how to prepare for your wedding photography session.',
                    'published_at': '2023-05-15',
                    'image': 'blog_wedding_tips.jpg',
                    'category': 'Wedding Photography',
                    'read_time': 5
                },
                {
                    'id': 2,
                    'title': 'Choosing the Right Photographer',
                    'excerpt': 'What to look for when selecting a photographer for your event.',
                    'published_at': '2023-04-10',
                    'image': 'blog_photographer_choice.jpg',
                    'category': 'Photography Tips',
                    'read_time': 3
                }
            ]
            return render_template('blogs.html', posts=posts)

        cursor = conn.cursor(cursor_factory=DictCursor)
        query = """
            SELECT id, title, excerpt, content,
                   TO_CHAR(published_at, 'Month DD, YYYY') as formatted_date,
                   image, category, read_time
            FROM blog_posts
            ORDER BY published_at DESC
        """
        cursor.execute(query)
        posts = cursor.fetchall()
        cursor.close()
        conn.close()
        return render_template('blogs.html', posts=posts)
    except Error as e:
        print(f"Database error: {e}")
        return render_template('blogs.html', posts=[])

if __name__ == '__main__':
    app.run(debug=True)