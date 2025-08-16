import { Inngest } from 'inngest';
import { serve as inngestServe } from 'inngest/express';
import User from "../models/user.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });
export const serve = inngestServe;

//Inngest function to save user data and receive events
// Inngest function to save user data and receive events
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event, step }) => {
        try {
            await step.run('Log event data', () => {
                console.log('Received clerk/user.created event:', JSON.stringify(event.data, null, 2));
            });
            
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            
            // Validate required fields
            if (!id || !email_addresses || !email_addresses.length) {
                throw new Error(`Missing required user data: ${JSON.stringify(event.data)}`);
            }
            
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: (first_name || '') + " " + (last_name || ''),
                image: image_url || 'https://via.placeholder.com/150'
            };
            
            await step.run('Create user in database', async () => {
                const result = await User.create(userData);
                console.log('User created in database:', result._id);
                return result;
            });
        } catch (error) {
            console.error('Error in syncUserCreation:', error);
            throw error;
        }
    }
);

// Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event, step }) => {
    try {
      await step.run('Log deletion event', () => {
        console.log('Received clerk/user.deleted event:', JSON.stringify(event.data, null, 2));
      });
      
      const { id } = event.data;
      if (!id) {
        throw new Error('User ID missing from deletion event');
      }
      
      await step.run('Delete user from database', async () => {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
          console.log(`User with ID ${id} not found in database`);
        } else {
          console.log(`User ${id} successfully deleted from database`);
        }
        return result;
      });
    } catch (error) {
      console.error('Error in syncUserDeletion:', error);
      throw error;
    }
  }
);

//Inngest function to update the USER
const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event, step }) => {
    try {
      await step.run('Log update event', () => {
        console.log('Received clerk/user.updated event:', JSON.stringify(event.data, null, 2));
      });
      
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      
      // Validate required fields
      if (!id) {
        throw new Error('User ID missing from update event');
      }
      
      const userData = {
        email: email_addresses && email_addresses[0] ? email_addresses[0].email_address : undefined,
        name: (first_name || '') + ' ' + (last_name || ''),
        image: image_url
      };
      
      // Remove undefined fields
      Object.keys(userData).forEach(key => 
        userData[key] === undefined && delete userData[key]
      );
      
      await step.run('Update user in database', async () => {
        const result = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!result) {
          console.log(`User with ID ${id} not found for update`);
        } else {
          console.log(`User ${id} successfully updated in database`);
        }
        return result;
      });
    } catch (error) {
      console.error('Error in syncUserUpdation:', error);
      throw error;
    }
  }
);

//Creation of a empty array which will store all the inngest functions to be exported
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];

