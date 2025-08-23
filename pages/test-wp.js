// pages/test-wp.js
// This is a temporary test page - delete it after confirming everything works
import { useState, useEffect } from 'react'
import { getPosts } from '../lib/wordpress'

export default function TestWordPress({ posts, error }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">WordPress Connection Test</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
          <div className="mt-2 text-sm">
            <p>Possible issues:</p>
            <ul className="list-disc list-inside mt-1">
              <li>WordPress is not installed at the expected URL</li>
              <li>WordPress REST API is not enabled</li>
              <li>CORS is blocking the request</li>
              <li>The domain in your API_URL is incorrect</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Success!</strong> Connected to WordPress. Found {posts?.length || 0} posts.
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts:</h2>
        {posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="border border-gray-200 rounded p-4">
                <h3 className="font-medium text-lg" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p className="text-gray-600 text-sm mt-1">
                  Published: {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts found or unable to connect to WordPress.</p>
        )}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-medium text-yellow-800">Next Steps:</h3>
        <ol className="list-decimal list-inside mt-2 text-yellow-700 space-y-1">
          <li>If you see an error, check your WordPress installation and API URL</li>
          <li>If you see posts, your connection is working!</li>
          <li>Delete this test page once everything is working</li>
          <li>Deploy to Vercel and configure your domain</li>
        </ol>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const posts = await getPosts(5) // Get 5 posts for testing
    
    return {
      props: {
        posts: posts || [],
        error: null
      }
    }
  } catch (error) {
    console.error('WordPress connection test failed:', error)
    
    return {
      props: {
        posts: [],
        error: error.message || 'Failed to connect to WordPress'
      }
    }
  }
}